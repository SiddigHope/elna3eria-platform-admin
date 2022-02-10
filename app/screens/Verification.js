import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import VerificationComponent from "../components/verification/VerificationComponent";
import { colors } from "../config/vars";

export default class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} style="dark" />
        <VerificationComponent email={this.props.route.params.email} navigation={this.props.navigation} />
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
