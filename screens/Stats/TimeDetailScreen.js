import React, { Component } from 'react';;
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import TimeListItem from '../../components/Stats/TimeListItem';
import styles from '../../constants/styles';
import { formatSeconds } from '../../functions/timeFunctions';

class TimeDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Time',
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.statsHeader,
      headerTintColor: '#fff'
    }
  }

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
    let {delays, timeStart, timeEnd} = this.props;

    let timeElapsed = (timeEnd?timeEnd:this.state.now) - timeStart;
    let totalTime = timeElapsed;

    if(delays) {
      delays.map((delay) => totalTime += delay.delay);
    }

    let listItems = [
      {
        icon: "timer",
        key: "Elapsed Time",
        label: "Elapsed Time",
        value: formatSeconds(timeElapsed/1000)
      }
    ];

    if(delays) {
      delays.map((delay, index) => {
        let iconSize;
        if (delay.name == "Small Hint") iconSize = 30;
        else if (delay.name == "Medium Hint") iconSize = 40;
        else iconSize = 50;

        listItems.push(
          {
            icon: "comment-question-outline",
            iconSize: iconSize,
            key: delay.name + index,
            label: delay.name,
            value: formatSeconds(delay.delay/1000)
          }
        )
      });
    }

    listItems.push({
      icon: "plus-circle",
      key: "Total",
      label: "Total",
      value: formatSeconds(totalTime/1000)
    })

    return (
      <View style={[styles.lightContainer, styles.centeredContainer]}>
        <FlatList
          data={listItems}
          renderItem={({item}) => (
            <TimeListItem item={item} />
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
    delays: state.home.delays
  }
};

export default connect(mapStateToProps, null)(TimeDetailScreen);
