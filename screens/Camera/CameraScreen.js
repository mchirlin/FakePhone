import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux'
import { Camera, Permissions, BarCodeScanner } from 'expo';
import { Entypo } from '@expo/vector-icons';

import styles, { mapStyle } from '../../constants/styles'
import { onLocationViewAll } from '../../reducers/mapReducer'

class CameraScreen extends Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    parsedDate: null
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Camera',
      headerLeft: (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#000" />
        </TouchableOpacity>
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
    const { navigation } = this.props

    const handleBarCodeScanned = ({ data }) => {
      // this.setState({ parsedData: data })
      // if (this.state.parsedData) {
        navigation.pop()
        navigation.navigate('Home')
      // } else {
      //   this.setState({ parsedData: data })
      // }
      alert('found: ' + data)
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

}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
