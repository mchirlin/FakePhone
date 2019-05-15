import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { Camera, Permissions, BarCodeScanner } from 'expo';

import HomeButton from '../../components/Common/HomeButton'
import { onEventActivate } from '../../reducers/eventReducer'
import styles from '../../constants/styles'

class CameraScreen extends Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Camera',
      headerLeft: (
        <HomeButton navigation={navigation} />
      ),
      headerTitleStyle: styles.textLarge
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { navigation, onEventActivate } = this.props

    const handleBarCodeScanned = ({ data }) => {
      navigation.navigate('Home')

      if (data.startsWith('FunEvents')) {
        onEventActivate({id: data.substr(10)})
      } else {
        alert('Invalid Code')
      }
    }

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }} type={this.state.type}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={handleBarCodeScanned}
            >
            {/* <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
              </TouchableOpacity>
            </View> */}
          </Camera>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = {
  onEventActivate
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
