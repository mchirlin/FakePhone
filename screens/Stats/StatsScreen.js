import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';

import StatsListItem from '../../components/Stats/StatsListItem'
import styles from '../../constants/styles'
import { formatSeconds } from '../../functions/timeFunctions'
import { onTimerUpdate } from '../../reducers/phoneReducer'

class StatsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Stats',
      headerLeft: (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.statsHeader,
      headerTintColor: '#fff'
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
    const {navigation, timeStart, timeEnd, penalties, distanceWalked, locationsFound, locationsTotal} = this.props;

    let totalTime = (timeEnd?timeEnd:this.state.now) - timeStart;

    if(penalties) {
      penalties.map((penalty) => {
        totalTime += penalty.penalty;
      });
    }

    return (
      <View style={[styles.lightContainer, styles.centeredContainer]}>
        <FlatList
          data={[
            {key: 'Total Time', icon: 'timer', value: formatSeconds(totalTime/1000)},
            {key: 'Distance Walked', icon: 'map-marker-distance', value: parseFloat(distanceWalked/1000).toFixed(1) + 'km'},
            {key: 'Locations Found', icon: 'map-marker-radius', value: (locationsFound?locationsFound:0) + '/' + locationsTotal}
          ]}
          renderItem={({item}) => (
            <StatsListItem item={item} navigation={navigation} />
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
    penalties: state.home.penalties,
    distanceWalked: state.map.distanceWalked,
    locationsFound: state.map.markers.filter(marker => marker.found && marker.visible).length,
    locationsTotal: state.map.locationsTotal
  }
};

const mapDispatchToProps = {
  onTimerUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen);
