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

class CountDownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {secondsRemaining: 0};
  }

  tick = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.setState({secondsRemaining: this.props.secondsRemaining});
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Text style={styles.countdown}>
        <Text style={styles.countdownUnits}>Days</Text>
        <Text style={styles.countdownUnits}>Hours</Text>
        <Text style={styles.countdownUnits}>{this.state.secondsRemaining} Sec</Text>
      </Text>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CountDownTimer secondsRemaining="10"/>
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
  countdown: {
    flexDirection: 'row',
  }
});
