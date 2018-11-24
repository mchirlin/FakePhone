import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

import TabBar from '../components/Common/TabBar'
import AppButtonGrid from '../components/Common/AppButtonGrid'
import styles from '../constants/styles'

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigation, appBadges} = this.props

    return (
      <View style={[styles.lightContainer, {alignItems: 'stretch'}]}>
        <View style={styles.contentContainer}>
          <AppButtonGrid navigation={navigation} buttons={[
            {icon: "bank", app: "BankApp"},
            {icon: "calendar", app: "CalendarApp"},
            {icon: "camera", app: "CameraApp"},
            {icon: "photo", app: "PhotosApp"}
          ]}/>
        </View>
        <TabBar navigation={navigation} appBadges={appBadges} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    appBadges: {
      phone: state.phone.badgeNumber,
      message: state.message.badgeNumber,
      mail: state.mail.badgeNumber,
      map: state.map.badgeNumber
    }
  }
};

export default connect(mapStateToProps)(HomeScreen);
