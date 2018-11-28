import React, { Component } from 'react'
import { Text, View } from 'react-native'

import AppButton from './AppButton'
import styles from '../../constants/styles'

export default class AppButtonGrid extends Component {
  render() {
    const {numColumns} = this.props
    const {buttons} = this.props
    const {navigation} = this.props

    return (
      <View style={styles.gridLayout}>
        {
          buttons.map((item, index) => {
            if (item.app) {
              return (
                <AppButton
                  key={item.app}
                  icon={item.icon}
                  navigation={navigation}
                  app={item.app}
                  badgeNumber={0} />
              )
            } else {
              return (
                <View key={index} style={styles.appSpace} />
              )
            }
          })
        }
      </View>
    )
  }
}
