import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { Camera, Permissions, BarCodeScanner } from 'expo';

import styles from '../../constants/styles'

export default class Scanner extends Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    parsedDate: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { onScan, persistor } = this.props

    const handleBarCodeScanned = ({ data }) => {
      onScan(data)
      // alert('found: ' + data)
    }

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1, justifyContent: 'flex-end' }} type={this.state.type}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={handleBarCodeScanned}
          >
            {/*TODO*/}
            <Button onPress={() => {persistor.purge()}} title="Purge"/>
          </Camera>
        </View>
      );
    }
  }
}
