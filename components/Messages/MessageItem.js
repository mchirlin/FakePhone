import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { Avatar } from 'react-native-elements'

import styles from '../../constants/styles'

export default class MessageItem extends Component {

  render() {
    const {item} = this.props
    const {navigation} = this.props

    return (
      <TouchableHighlight style={styles.mailItem} underlayColor='#b771cf' onPress={() => {
          navigation.navigate('MessageDetail')
        }}>
        <View style={styles.rowLayout}>
          <Avatar
            containerStyle={styles.avatar}
            size="small"
            rounded
            title="MT"
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        <View style={styles.baseContainer}>
            <View style={styles.mailItemHeader}>
              <Text style={styles.textLargeBold}>{item.from}</Text>
              <Text style={[styles.textMedium]}>{item.time} ></Text>
            </View>
            <Text style={styles.textSmall}>{item.body}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
