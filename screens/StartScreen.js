import React, {Component} from 'react';
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';

import styles from '../constants/styles'

class StartScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const {navigation, instructions, buttonTitle} = this.props

    return (
      <View style={styles.startContainer}>
        {
          instructions.map((instruction, index) => (
            <Text key={index} style={styles.startInstruction}>{instruction}</Text>
          ))
        }

        <Button
          title={buttonTitle}
          raised
          onPress={() => {
            navigation.navigate('Lock')
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    instructions: state.start.instructions,
    buttonTitle: start.state.buttonTitle
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
