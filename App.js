import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
import FakePhone from './FakePhone'
import Sentry from 'sentry-expo';

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;

Sentry.config('https://0d5128142bbc4a23a060d00674c9be9e@sentry.io/1505671').install();

export default class App extends Component {

  render() {
    return (
      <FakePhone />
    )
  }
}
