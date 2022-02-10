import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import SigninComponent from "../components/signin/SigninComponent";
import { colors } from "../config/vars";

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
