import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { Image } from 'react-native-expo-image-cache'

import ImageBackground from '../components/Common/ImageBackground'
import TabBar from '../components/Common/TabBar'
import AppButtonGrid from '../components/Common/AppButtonGrid'
import styles from '../constants/styles'
import colors from '../constants/colors'

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigation, background, appBadges} = this.props

    return (
      <ImageBackground
        uri={background}
        style={{alignItems: 'stretch', width: '100%', height:'100%', backgroundColor: '#000'}}>
        <View style={styles.contentContainer}>
          <AppButtonGrid navigation={navigation} buttons={[
            {icon: "bank", iconSize: 50, app: "BankApp", backgroundColor: colors.tomato, iconColor: '#fff', badgeNumber: appBadges.bank},
            {icon: "calendar", app: "CalendarApp", backgroundColor: colors.blue, iconColor: '#fff'},
            {icon: "camera", app: "CameraApp", iconColor: '#222'},
            {icon: "photo", app: "PhotosApp", iconColor: 'purple', badgeNumber: appBadges.photos},
            {icon: "line-chart", app: "StatsApp", backgroundColor: colors.green, iconColor: 'white'},
            {icon: "gear", app: "SettingsApp", iconColor: '#222'},
            /* So that Apps line up nicely */
            {},
            {}
          ]}/>
        </View>

        <TabBar navigation={navigation} appBadges={appBadges} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    background: state.home.background,
    appBadges: {
      phone: state.phone.badgeNumber,
      message: state.message.badgeNumber,
      mail: state.mail.badgeNumber,
      map: state.map.badgeNumber,
      photos: state.photos.badgeNumber,
      bank: state.bank.badgeNumber
    }
  }
};

export default connect(mapStateToProps)(HomeScreen);
