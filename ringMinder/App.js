import React from 'react';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

class Ring extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isInserted: false};
  }

  _onPress = () => {
    this.setState(previousState => {
      return { isInserted: !previousState.isInserted };
    });
  }

  render() {
    let text = this.state.isInserted ? 'Inserted' : 'Removed';

    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View>
          <Text>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class Timer extends React.Component {
  render() {
    return (
      <Text style={styles.timer}>
        <Text style={styles.timerUnits}>Days</Text>
        <Text style={styles.timerUnits}>Hours</Text>
        <Text style={styles.timerUnits}>Mins</Text>
      </Text>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Timer />
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
  timer: {
    flexDirection: 'row',
  }
});
