import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import styles from '../../constants/styles'

export default class MailItem extends Component {

  render() {
    const {onPress} = this.props
    const {item} = this.props
    const {navigation} = this.props

    return (
      <TouchableHighlight
        style={styles.mailItem}
        underlayColor='#b771cf'
        onPress={() => {
          onPress(item.id)
          navigation.navigate('MailDetail')
        }}>
        <View>
          <View style={styles.mailItemHeader}>
            <Text style={item.read?styles.textLarge:styles.textLargeBold}>{item.from}</Text>
            <Text style={[item.read?styles.textMedium:styles.textMediumBold, styles.blueText]}>{item.time}</Text>
          </View>
          <Text style={item.read?styles.textMedium:styles.textMediumBold}>{item.subject}</Text>
          <Text style={styles.textSmall}>{item.body.substr(0, 45)}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
