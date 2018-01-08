import React from 'react';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

class Ring extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isInserted: false};
  }

  _onPress = () => {
    this.setState({ datePressed: new Date()});
    const {isInserted, datePressed} = this.state;
    const days = isInserted ? 21 : 7;
    const endDate = datePressed.setDate(datePressed.getDate() + days);

    this.props.onSetCountDownTimer(endDate, 1);

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
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0
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
    const {endDate} = this.props;
    const countDown = formatTime(endDate);
    return (
      <Text style={styles.countdown}>
        <Text style={styles.countdownUnits}>{countDown.days} Days</Text>
        <Text style={styles.countdownUnits}>{countDown.hours} Hrs</Text>
        <Text style={styles.countdownUnits}>{countDown.minutes} Mins</Text>
        <Text style={styles.countdownUnits}>{countDowm.seconds} Sec</Text>
      </Text>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: 0,
      countDownStatus: 0
    };
  }

  handleSetCountDownTimer(date, countDownStatus) {
    this.setState({
      endDate: date,
      countDownStatus: countDownStatus
    });
  }

  render() {
    let {endDate} = this.state;

    return (
      <View style={styles.container}>
        <CountDownTimer endDate={endDate}/>
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
