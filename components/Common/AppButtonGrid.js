import React, { Component } from 'react'
import { View, Text } from 'react-native'

import AppButton from './AppButton'
import styles from '../../constants/styles'

export default class AppButtonGrid extends Component {
  render() {
    const {numColumns} = this.props
    const {buttons} = this.props
    const {navigation} = this.props

    return (
      // Number of rows = roundup(buttons/numColumns)
      // Number of columns = numColumns
      // Start counter at 0,
      // For each button, increment counter
      // When counter = numColumns, set back to zero and increment row
      <View style={styles.rowLayout}>
        {
          buttons.map((item) => (
            <AppButton
              key={item.app}
              icon={item.icon}
              navigation={navigation}
              app={item.app}
              badgeNumber={0} />
          ))
        }
      </View>
    )
  }
}
