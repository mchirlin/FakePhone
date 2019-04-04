import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import styles from '../../constants/styles'

export default class MailListItem extends Component {

  render() {
    const {onPress} = this.props
    const {item} = this.props
    const {navigation} = this.props

    return (
      <TouchableHighlight
        style={styles.mailItem}
        underlayColor='#ccc'
        onPress={() => {
          onPress(item.id)
          navigation.navigate('MailDetail',
            {itemId: item.id, from: item.from}
          )
        }}>
        <View>
          <View style={styles.mailItemHeader}>
            <Text style={item.read?styles.textLarge:styles.textLargeBold}>{item.from}</Text>
            <Text style={item.read?styles.textMedium:[styles.textMediumBold, styles.textBlue]}>{item.time}</Text>
          </View>
          <Text style={item.read?styles.textMedium:styles.textMediumBold}>{item.subject}</Text>
          <Text style={styles.textSmall}>{item.body.substr(0, 45)}...</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
