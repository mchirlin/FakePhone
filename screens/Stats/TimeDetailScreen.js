import React, { Component } from 'react';;
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

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
    let {penalties, timeStart, timeEnd} = this.props;

    let timeElapsed = (timeEnd?timeEnd:this.state.now) - timeStart;
    let totalTime = timeElapsed;

    if(penalties) {
      penalties.map((penalty) => totalTime += penalty.penalty);
    }

    let listItems = [
      {
        icon: "timer",
        key: "Elapsed Time",
        label: "Elapsed Time",
        value: formatSeconds(timeElapsed/1000)
      }
    ];

    if(penalties) {
      penalties.map((penalty, index) => {
        let iconSize;
        if (penalty.name == "Small Hint") iconSize = 30;
        else if (penalty.name == "Medium Hint") iconSize = 40;
        else iconSize = 50;

        let icon;
        if (penalty.name.includes("Hint")) icon = "comment-question-outline";
        else if (penalty.name.includes("Answer")) icon = "close-box-outline";
        else icon = "comment-question-outline";

        listItems.push(
          {
            icon: icon,
            iconSize: iconSize,
            key: penalty.name + index,
            label: penalty.name,
            value: formatSeconds(penalty.penalty/1000)
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
    penalties: state.home.penalties
  }
};

export default connect(mapStateToProps, null)(TimeDetailScreen);
