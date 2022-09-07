import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, BackHandler, Alert } from "react-native";
import SigninComponent from "../components/signin/SigninComponent";
import { colors } from "../config/vars";
import UserClass from '../config/authHandler';
import { goToScreen } from '../config/functions';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.checkUser();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentDidUpdate() {
    this.checkUser();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'إنهاء التطبيق',
        'هل حقاً تريد إنهاء التطبيق',
        [
          {
            text: 'لا',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'نعم', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false },
      );
      return true;
    }
    // return true;  // Do nothing when back button is pressed
  };

  checkUser = async () => {
    // UserClass.logout()
    const check = await UserClass.isAuthenticated()
    if (check) {
      goToScreen("Tabs", this.props.navigation)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} style="light" />
        <SigninComponent navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
  },
});
