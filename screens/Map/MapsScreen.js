import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';

import styles, { mapStyle } from '../../constants/styles'

class MapsScreen extends Component {
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
    const {markers, currentLocation} = this.props

    return (
      <View style={{flex: 1}}>
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
          {
            markers.map(marker => (
              <MapView.Marker
                key={marker.title}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}
              />
            ))
          }
        </MapView>
        <Text>Longitude: {currentLocation.longitude.toString().substr(0,10)}, Latitude: {currentLocation.latitude.toString().substr(0,10)}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    markers: state.map.markers,
    currentLocation: state.map.currentLocation
  }
};

export default connect(mapStateToProps)(MapsScreen);
