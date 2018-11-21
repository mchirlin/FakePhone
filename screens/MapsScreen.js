import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MapView } from 'expo'
import { Entypo } from '@expo/vector-icons';

import styles, { mapStyle } from '../constants/styles'

export default class MapsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Map',
      headerLeft: (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#000" />
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.textLarge
    }
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
        showsUserLocation
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
