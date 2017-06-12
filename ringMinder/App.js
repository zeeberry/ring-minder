import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Ring extends React.Component {
  render() {
    return (
      <Text>{this.props.text}</Text>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ring text='Inserted' />
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
});
