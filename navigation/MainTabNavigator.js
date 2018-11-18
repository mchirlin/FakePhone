import React from 'react';
import { View, TouchableOpacity, Platform, StyleSheet, Animated, Easing } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { Entypo } from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PhoneScreen from '../screens/Phone/PhoneScreen';
import PhoneCallScreen from '../screens/Phone/PhoneCallScreen';
import MessagesScreen from '../screens/Messages/MessagesScreen';
import MessageDetailScreen from '../screens/Messages/MessageDetailScreen';
import MailScreen from '../screens/Mail/MailScreen';
import MailDetailScreen from '../screens/Mail/MailDetailScreen';
import MapsScreen from '../screens/MapsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarButtonComponent: TouchableOpacity,
  tabBarIcon: ({ focused }) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={
    //     Platform.OS === 'ios'
    //       ? `ios-information-circle${focused ? '' : '-outline'}`
    //       : 'md-information-circle'
    //   }
    // />
    <View style={styles.icon} />
  ),
};

const PhoneStack = createStackNavigator(
  {
    Phone: PhoneScreen,
    PhoneCall: PhoneCallScreen
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      }
    })
  }
);

PhoneStack.navigationOptions = {
  tabBarLabel: 'Phone',
  tabBarButtonComponent: TouchableOpacity,
  tabBarIcon: ({ focused }) => (
    <View style={styles.icon}>
      <Entypo name="phone" size={60} color="#000" />
    </View>
  ),
}

const MessagesStack = createStackNavigator({
  Messages: MessagesScreen,
  MessageDetail: MessageDetailScreen,
});

MessagesStack.navigationOptions = {
  tabBarLabel: 'Messages',
  tabBarButtonComponent: TouchableOpacity,
  tabBarIcon: ({ focused }) => (
    <View style={styles.icon}>
      <Entypo name="message" size={60} color="#000" />
    </View>
  ),
};

const MailStack = createStackNavigator({
  Mail: MailScreen,
  MailDetail: MailDetailScreen
});

MailStack.navigationOptions = {
  tabBarLabel: 'Mail',
  tabBarButtonComponent: TouchableOpacity,
  tabBarIcon: ({ focused }) => (
    <View style={styles.icon}>
      <Entypo name="mail" size={60} color="#000" />
    </View>
  ),
};

const MapsStack = createStackNavigator({
  Home: MapsScreen,
});

MapsStack.navigationOptions = {
  tabBarLabel: 'Maps',
  tabBarButtonComponent: TouchableOpacity,
  tabBarIcon: ({ focused }) => (
    <View style={styles.icon}>
      <Entypo name="map" size={60} color="#000" />
    </View>
  ),
};

export default createBottomTabNavigator(
  {
    PhoneStack,
    MessagesStack,
    MailStack,
    MapsStack,
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 100,
        backgroundColor: '#ccc',
      }
    },
  }
);

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
