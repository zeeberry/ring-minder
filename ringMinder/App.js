import React from 'react';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

class Ring extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isInserted: false};
  }

  _onPress = () => {
    const {isInserted} = this.state;
    const seconds = isInserted ? 100 : 21;

    this.props.onSetCountDownTimer(seconds, 1);

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
      secondsRemaining: this.props.secondsRemaining,
      minutesRemaining: 0,
      hoursRemaining: 0,
      daysRemaining: 0
    };
  }

  tick = () => {

    if (this.state.secondsRemaining > 0) {
      this.setState({secondsRemaining: this.state.secondsRemaining - 1});

      if (this.state.secondsRemaining === 0) {
        clearInterval(this.interval);
      }
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  formatSeconds(seconds) {
    const secondsInMinute = 60;
    return seconds % secondsInMinute;
  }

  formatMinutes(seconds) {
    const secondsInHour = 3600;
  }

  formatTime(seconds) {
    const secondsInDay = 86400;
    const secondsInHour = 3600;
    const secondsInMinute = 60;

    return {
      days: ~~(seconds / secondsInDay),
      hours: ~~(seconds / secondsInHour),
      minutes: ~~((seconds % secondsInHour) / secondsInMinute),
      seconds: seconds % secondsInMinute
    }
    
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
        <Text style={styles.countdownUnits}>{this.formatSeconds(this.props.secondsRemaining)} Sec</Text>
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

  handleSetCountDownTimer(seconds, countDownStatus) {
    this.setState({
      secondsRemaining: seconds,
      countDownStatus: countDownStatus
    });

    console.log(this.state.secondsRemaining);
    console.log(seconds);
  }

  render() {
    let {secondsRemaining} = this.state;

    return (
      <View style={styles.container}>
        <CountDownTimer secondsRemaining={secondsRemaining}/>
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
