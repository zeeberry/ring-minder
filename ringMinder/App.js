import React from 'react';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

class Ring extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isInserted: false};
  }

  _onPressButton() {
     Alert.alert('You tapped the button!');
  }

  render() {
    let text = this.state.isInserted ? 'Inserted' : 'Removed';

    return (
      <TouchableWithoutFeedback onPress={this._onPressButton}>
        <View>
          <Text>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ring />
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
