import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo'
import { connect } from 'react-redux'

import HomeButton from '../../components/Common/HomeButton'
import styles, { mapStyle } from '../../constants/styles'
import { onLocationViewAll } from '../../reducers/mapReducer'

class MapsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Map',
      headerLeft: (
        <HomeButton navigation={navigation} />
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
      locationsTotal,
      initialRegion
    } = this.props

    const locationsFound = markers.filter(marker => marker.found).length

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
          initialRegion={initialRegion?initialRegion:{
            latitude: -33.8733152,
            longitude: 151.2249823,
            latitudeDelta: 0.045,
            longitudeDelta: 0.030,
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
    locationsTotal: state.map.locationsTotal,
    initialRegion: state.map.initialRegion
  }
};

const mapDispatchToProps = {
  onLocationViewAll
}

export default connect(mapStateToProps, mapDispatchToProps)(MapsScreen);
