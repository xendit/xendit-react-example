import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class ValidationScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
        <Text>This will be a 3DS screen</Text>
      </View>
    );
  }
}