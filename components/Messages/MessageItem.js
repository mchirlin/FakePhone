import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { Avatar } from 'react-native-elements'

import styles from '../../constants/styles'

export default class MessageItem extends Component {

  render() {
    const {thread, lastMessage, onPress} = this.props
    const {navigation} = this.props

    return (
      <TouchableHighlight style={styles.mailItem} underlayColor='#b771cf' onPress={() => {
          onPress(thread.id)
          navigation.navigate('MessageDetail', {itemId: thread.id, contact: thread.contact})
        }}>
        <View style={styles.rowLayout}>
          <Avatar
            containerStyle={styles.avatar}
            size="small"
            rounded
            title={thread.contact.initials}
            activeOpacity={0.7}
          />
        <View style={styles.baseContainer}>
            <View style={styles.mailItemHeader}>
              <Text style={lastMessage.read?styles.textLarge:styles.textLargeBold}>{thread.contact.name}</Text>
              <Text style={styles.textMedium}>{lastMessage.time}</Text>
            </View>
            <Text style={styles.textSmall}>{lastMessage.message}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
