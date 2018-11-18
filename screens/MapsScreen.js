import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MapView } from 'expo'

import { mapStyle } from '../constants/styles'

export default class MapsScreen extends Component {
  static navigationOptions = {
    title: 'Map'
  }

  render() {
    return (
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -33.889,
          longitude: 151.197834,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: -33.889,
            longitude: 151.197834,
          }}
          title='My Location'
          description='Description'
        />
      </MapView>
    );
  }
}
