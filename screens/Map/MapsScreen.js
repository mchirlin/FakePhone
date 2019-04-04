import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Location, MapView } from 'expo'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements';

import HomeButton from '../../components/Common/HomeButton'
import styles, { mapStyle } from '../../constants/styles'
import { onLocationViewAll } from '../../reducers/mapReducer'

import { LOCATION_TASK_NAME } from '../../constants/tasks'

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

  onStart = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High
    });
  };

  onEnd = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  };

  render() {
    const {
      markers,
      regions,
      path,
      currentLocation,
      locationsTotal,
      initialRegion
    } = this.props

    const locationsFound = markers.filter(marker => marker.found && marker.visible).length

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
        <View style={styles.listSeparator}/>
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
              marker.visible?
              <MapView.Marker
                key={marker.title}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                pinColor={marker.found?'green':'red'}
                title={marker.found?marker.title + ' (Visited)':marker.title}
                description={marker.description}
              />:null
            ))
          }
          {
            regions.map(region => (
              region.visible?
              <MapView.Polygon
                key={region.id}
                coordinates={region.coordinates}
                strokeColor={region.found?'green':'red'}
                fillColor={region.found?'rgba(0,255,0,0.5)':'rgba(255,0,0,0.5)'}
              />:null
            ))
          }
          <MapView.Polyline
            coordinates={path}
            strokeWidth={4}
            lineCap="round"
            lineDashPattern={[10,5]}
            strokeColor="green"
          />
        </MapView>
        {/* <Text>Longitude: {currentLocation.longitude.toString().substr(0,10)}, Latitude: {currentLocation.latitude.toString().substr(0,10)}</Text> */}
        {/* <Button
          raised
          icon={{name: 'map', color: 'white'}}
          title='Start Background Tracking'
          onPress={this.onStart}/>
        <Button
            raised
            buttonStyle={{backgroundColor: 'red'}}
            icon={{name: 'map', color: 'white'}}
            title='Stop Background Tracking'
            onPress={this.onEnd}/> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    markers: state.map.markers,
    regions: state.map.regions,
    path: state.map.path,
    currentLocation: state.map.currentLocation,
    locationsTotal: state.map.locationsTotal,
    initialRegion: state.map.initialRegion
  }
};

const mapDispatchToProps = {
  onLocationViewAll
}

export default connect(mapStateToProps, mapDispatchToProps)(MapsScreen);
