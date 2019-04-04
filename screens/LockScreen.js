import React, {Component} from 'react';
import { KeyboardAvoidingView, StyleSheet, Dimensions, Text, View } from 'react-native';
import { Header } from 'react-navigation'
import { connect } from 'react-redux';
import { Location } from 'expo';

import CodePin from '../components/Common/CodePin';
import {onLocationUpdate} from '../reducers/mapReducer'
import {onEventActivate, onEventTimerStart} from '../reducers/eventReducer'
import {onUnlock} from '../reducers/lockReducer'
import {onTimerStart} from '../reducers/homeReducer'

const {height, width} = Dimensions.get('window');
import {LOCATION_TASK_NAME} from '../constants/tasks';

class LockScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor() {
    super();

    this.state = {
      displayCodePin: true,
      success: ''
    };
  }

  onSuccess = () => {
    this.setState({
      displayCodePin: false,
      success: 'A success message :)'
    });
  };

  render() {

    const {
      navigation,
      lockCode,
      triggers,
      onUnlock,
      onLocationUpdate,
      onTimerStart,
      onEventTimerStart,
      onEventActivate
    } = this.props;

    return (
      <View style={styles.container}>
        {/* <Text style={styles.instructions}>{this.state.success}</Text> */}
        <KeyboardAvoidingView
          behavior={'position'}
          keyboardVerticalOffset = {Header.HEIGHT + 20}
          contentContainerStyle={styles.avoidingView}
        >
          <CodePin
            ref={ref => (this.ref = ref)}
            code={lockCode}
            number={4}
            obfuscation
            autoFocusFirst={false}
            success={() => {
              if (triggers) {
                triggers.map((trigger) => {
                  onEventActivate(trigger.id);
                })
              }
              onUnlock();
              onTimerStart();
              onEventTimerStart();
              navigation.navigate('Home');

              ( async () => {
                const location = await Location.getCurrentPositionAsync();
                onLocationUpdate(location);
                await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                  accuracy: Location.Accuracy.High,
                  showsBackgroundLocationIndicator: true
                });
              })();
            }}
            containerPinStyle={styles.containerPinStyle}
            containerStyle={styles.containerStyle}
            pinStyle={styles.pinStyle}
            textStyle={styles.textStyle}
            text={'Enter PIN'}
            errorStyle={{fontSize: 10}}
            error={'Look at the code ;)'}
            keyboardType="numeric"
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333'
  },
  avoidingView: {
    borderRadius: 10,
    width: width - 30,
  },
  containerStyle: {
    borderRadius: 10,
    justifyContent: 'space-around'
  },
  containerPinStyle:{
    flex: 1,
  },
  pinStyle: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 30,
    height: 80,
    fontFamily: 'balsamiq-sans-regular'
  },
  success: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center'
  },
  textStyle: {
    fontSize: 30,
    marginTop: 0,
    color: '#fff',
    fontFamily: 'balsamiq-sans-regular'
  },
});

const mapStateToProps = state => {
  return {
    lockCode: state.lock.lockCode,
    triggers: state.lock.triggers
  }
};

const mapDispatchToProps = {
  onEventActivate,
  onUnlock,
  onTimerStart,
  onEventTimerStart,
  onLocationUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(LockScreen);
