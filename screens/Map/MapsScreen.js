import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';

import styles, { mapStyle } from '../../constants/styles'
import { onLocationViewAll } from '../../reducers/mapReducer'

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

  componentDidMount() {
    const {onLocationViewAll} = this.props

    onLocationViewAll()
  }

  render() {
    const {
      markers,
      currentLocation,
      locationsFound,
      locationsTotal
    } = this.props

    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', padding: 10}}>
          <Text>
            <Text style={styles.textLargeBold}>{locationsFound}</Text>
            <Text style={styles.textLarge}> of </Text>
            <Text style={styles.textLargeBold}>{locationsTotal}</Text>
            <Text style={styles.textLarge}> locations found</Text>
          </Text>
        </View>
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
                pinColor={marker.found?'green':'red'}
                title={marker.found?marker.title + ' (Visited)':marker.title}
                description={marker.description}
              />
            ))
          }
        </MapView>
        {/* <Text>Longitude: {currentLocation.longitude.toString().substr(0,10)}, Latitude: {currentLocation.latitude.toString().substr(0,10)}</Text> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    markers: state.map.markers,
    currentLocation: state.map.currentLocation,
    locationsFound: state.map.locationsFound,
    locationsTotal: state.map.locationsTotal
  }
};

const mapDispatchToProps = {
  onLocationViewAll
}

export default connect(mapStateToProps, mapDispatchToProps)(MapsScreen);
