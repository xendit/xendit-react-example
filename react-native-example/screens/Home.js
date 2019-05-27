import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Xendit',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.option}
          onPress={() => navigate('Token')}
        >
          <Text> Create Token </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.option}
          onPress={() => navigate('Authentication')}
        >
          <Text> Create Authentication </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    marginTop: 20
  }
});
