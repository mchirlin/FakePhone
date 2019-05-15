import React, {Component} from 'react';
import { Text, ScrollView } from 'react-native'
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
      <ScrollView style={styles.startContainer}>
        {
          instructions?instructions.map((instruction, index) => (
            <Text key={index} style={styles.startInstruction}>{instruction}</Text>
          )):null
        }

        <Button
          title={buttonTitle?buttonTitle:"Get Started!"}
          raised
          onPress={() => {
            navigation.navigate('Lock')
          }}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    instructions: state.start.instructions,
    buttonTitle: state.start.buttonTitle
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
