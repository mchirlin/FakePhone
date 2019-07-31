import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import HomeButton from '../../components/Common/HomeButton';
import { onEventActivate } from '../../reducers/eventReducer';
import { onQrFound } from '../../reducers/cameraReducer';
import styles from '../../constants/styles';

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

  render() {
    const { hasCameraPermission } = this.state;
    const { qrCodes, navigation, onEventActivate, onQrFound } = this.props

    const handleBarCodeScanned = ({ data }) => {
      navigation.navigate('Home')

      if (data.startsWith('FunEvents')) {
        let id = data.substr(10);
        onEventActivate({id: id});

        const qrCode = qrCodes.find((qrCode) => {
          return qrCode.id === id
        })

        if (qrCode && !qrCode.found) {
          onQrFound(qrCode);
          qrCode.triggers.map((trigger) => {
            onEventActivate(trigger);
          })
        }
      } else {
        alert('Invalid Code')
      }
    }

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

const mapStateToProps = state => {
  return {
    qrCodes: state.camera.qrCodes
  }
};

const mapDispatchToProps = {
  onEventActivate,
  onQrFound
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
