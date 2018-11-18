import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import styles from '../../constants/styles'

export default class MailItem extends Component {

  render() {
    const {item} = this.props
    const {navigation} = this.props

    return (
      <TouchableHighlight style={styles.mailItem} underlayColor='#b771cf' onPress={() => {
          navigation.navigate('MailDetail')
        }}>
        <View>
          <View style={styles.mailItemHeader}>
            <Text style={styles.textLargeBold}>{item.from}</Text>
            <Text style={[styles.textMediumBold, styles.blueText]}>{item.time}</Text>
          </View>
          <Text style={styles.textMediumBold}>{item.subject}</Text>
          <Text style={styles.textSmall}>{item.body}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
