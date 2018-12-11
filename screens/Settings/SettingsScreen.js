import React, { Component } from 'react';
import { SectionList, Text, View } from 'react-native'
import { connect } from 'react-redux'

import HomeButton from '../../components/Common/HomeButton'
import SettingsListItem from '../../components/Settings/SettingsListItem'
import styles from '../../constants/styles'

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      headerLeft: (
        <HomeButton navigation={navigation} />
      ),
      headerTitleStyle: styles.textLarge
    }
  }
  renderSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    )
  }

  render() {
    const {navigation} = this.props
    const sections = [
      {
        title: 'Management',
        data: [
          {label: 'Data', screen: 'Data'}
        ]
      }
    ]

    return (
      <View style={[styles.lightContainer, styles.centeredContainer]}>
        <SectionList
          sections={sections}
          renderItem={({item, index, section}) => (
            <SettingsListItem key={index} item={item} navigation={navigation} />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={[styles.settingsHeader, styles.textLargeBold]}>{title}</Text>
          )}
          keyExtractor={(item, index) => item + index}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
