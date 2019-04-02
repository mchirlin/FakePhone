import React, {Component} from 'react';
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';

import styles from '../../constants/styles'

class InstructionsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Instructions',
      headerTitleStyle: styles.textLarge
    }
  }

  render() {
    const {navigation, instructions} = this.props

    return (
      <View style={styles.startContainer}>
        {
          instructions?instructions.map((instruction, index) => (
            <Text key={index} style={styles.startInstruction}>{instruction}</Text>
          )):null
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    instructions: state.settings.instructions
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructionsScreen);
