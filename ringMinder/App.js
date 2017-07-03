import React from 'react';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

class Ring extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isInserted: false};
  }

  _onPress = () => {
    this.props.onSetCountdownTime(100, 0);
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
    this.state = {
      secondsRemaining: 0,
      minutesRemaining: 0,
      hoursRemaining: 0,
      daysRemaining: 0
    };
  }

  tick = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  }

  getRemainderTime() {
  
  }

  componentDidMount() {
    const totalSecondsRemaining = this.props.secondsRemaining;
    const secondsInDay = 86400;
    const secondsInHour = 3600;
    const secondsInMinute = 60;
    const days = ~~(totalSecondsRemaining / secondsInDay);
    const hours = ~~(totalSecondsRemaining / secondsInHour);
    const minutes = ~~((totalSecondsRemaining % secondsInHour) / secondsInMinute);
    const seconds = totalSecondsRemaining % secondsInMinute;

    this.setState({
      daysRemaining: days,
      hoursRemaining: hours,
      minutesRemaining: minutes,
      secondsRemaining: seconds
    });

    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Text style={styles.countdown}>
        <Text style={styles.countdownUnits}>{this.state.daysRemaining} Days</Text>
        <Text style={styles.countdownUnits}>{this.state.hoursRemaining} Hrs</Text>
        <Text style={styles.countdownUnits}>{this.state.minutesRemaining} Mins</Text>
        <Text style={styles.countdownUnits}>{this.state.secondsRemaining} Sec</Text>
      </Text>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 0,
      countDownStatus: 0
    };
  }

  handleSetCountDownTimer(seconds, countDownDtatus) {
    this.setState({
      secondsRemaining: seconds,
      countDownStatus: countDownStatus
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CountDownTimer secondsRemaining="100"/>
        <Ring onSetCountDownTimer={this.handleSetCountDownTimer.bind(this)}/>
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
  },
  countdownUnits: {
  }
});
