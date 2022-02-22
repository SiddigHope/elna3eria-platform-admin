import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import SignupComponent from "../components/signup/SignupComponent";
import { getDepartments } from "../config/apis/authentication";
import { colors } from "../config/vars";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments:[]
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({
      departments: await getDepartments(),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} style="light" />
        <SignupComponent navigation={this.props.navigation} departments={this.state.departments} />
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
