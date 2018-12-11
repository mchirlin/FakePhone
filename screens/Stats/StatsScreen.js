import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';

import StatsListItem from '../../components/Stats/StatsListItem'
import styles from '../../constants/styles'
import { formatSeconds } from '../../reducers/functions'
import { onTimerUpdate } from '../../reducers/phoneReducer'

class StatsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Stats',
      headerLeft: (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#000" />
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.textLarge
    }
  };

  state = {
    now: (new Date()).getTime()
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.setState(
      {now: (new Date()).getTime()}), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  renderSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    )
  }

  render() {
    const {navigation, timeStart, timeEnd, distanceWalked, locationsFound, locationsTotal} = this.props

    return (
      <View style={[styles.lightContainer, styles.centeredContainer]}>
        <FlatList
          data={[
            {key: 'Elapsed Time', icon: 'timer', value: formatSeconds(
              ((timeEnd?timeEnd:this.state.now) - timeStart)/1000
            )},
            {key: 'Distance Walked', icon: 'map-marker-distance', value: parseFloat(distanceWalked/1000).toFixed(1) + 'km'},
            {key: 'Locations Found', icon: 'map-marker-radius', value: (locationsFound?locationsFound:0) + '/' + locationsTotal}
          ]}
          renderItem={({item}) => (
            <StatsListItem item={item} />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    timeStart: state.home.timeStart,
    timeEnd: state.home.timeEnd,
    distanceWalked: state.map.distanceWalked,
    locationsFound: state.map.markers.filter(marker => marker.found).length,
    locationsTotal: state.map.locationsTotal
  }
};

const mapDispatchToProps = {
  onTimerUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen);
