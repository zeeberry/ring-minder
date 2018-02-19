import React from 'react';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

class CurrentStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInserted: false,
      datePressed: 0,
      endDate: 0
    };
  }

  _onPress = () => {
    const {isInserted} = this.state;
    const datePressed = new Date();
    const endDate = this._getEndDate(datePressed);
    console.log(endDate);
    console.log(datePressed);

    this.setState(previousState => {
      return { 
        isInserted: !previousState.isInserted,
        datePressed: datePressed, 
        endDate: endDate
      };
    });

    console.log('state ' + JSON.stringify(this.state));
  }

  _getEndDate = (datePressed) => {
    const {isInserted} = this.state;
    const days = isInserted ? 21 : 7;
    const newDate = new Date();
    const unixEndDate = newDate.setDate(datePressed.getDate() + days);
    const endDate = new Date(unixEndDate);
    return endDate;
  }

  render() {
    let currentStatus = this.state.isInserted ? 'Inserted' : 'Removed';

    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View>
          <Text>{currentStatus}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class EndDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let date = new Date();

    return (
      <View>
        <Text>{date}</Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: 0
    };
  }

  handleSetCountDownTimer(date) {
    this.setState({
      endDate: date,
    });
  }

  render() {
    let {endDate} = this.state;

    return (
      <View style={styles.container}>
        <CurrentStatus onSetCountDownTimer={this.handleSetCountDownTimer.bind(this)}/>
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
  }
});
