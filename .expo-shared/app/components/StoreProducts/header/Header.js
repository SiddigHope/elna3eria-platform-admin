import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../../config/vars";
import RoundedIcons from "./RoundedIcons";
import Input from "./Input";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/Feather";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[styles.container]}
      >
        <View style={styles.headerContainer}>
          <RoundedIcons items={2} type="cart" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.hello}> {"مرحبا بك في"} </Text>
            <Text style={styles.storeTitle}> {"سوق المعيلق"} </Text>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <Input
            closeSearching={this.props.closeSearching}
            onChangeText={this.props.onChangeText}
            searching={this.props.searching}
          />
          <RoundedIcons items={2} type="chat" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 155,
    width: "100%",
    // backgroundColor: 'red',
    alignItems: "center",
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerTextContainer: {
    // height: 25,
    // backgroundColor: 'red',
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  hello: {
    fontFamily: "Tajawal-Regular",
    fontSize: 18,
    color: "grey",
  },
  storeTitle: {
    fontFamily: "Tajawal-Bold",
    fontSize: 18,
    color: colors.softBlack,
  },
});
