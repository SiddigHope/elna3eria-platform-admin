import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../../config/vars";
import Avatar from "./Avatar";
import Input from "./Input";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, this.props.searching?{height:50}:{}]}>
        <View style={styles.headerContainer}>
          <Avatar />
          <Input closeSearching={this.props.closeSearching} onChangeText={this.props.onChangeText} searching={this.props.searching}/>
          <View style={styles.barsContainer}>
            <View style={styles.bars}></View>
            <View style={[styles.bars, { width: "70%" }]}></View>
            <View style={styles.bars}></View>
          </View>
        </View>
        {this.props.searching ? null : (
          <View style={styles.imageBanner}>
            <Image
              style={styles.image}
              source={require("../../../../assets/images/publicity.jpg")}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: "100%",
    // backgroundColor: 'red',
    alignItems: "center",
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  barsContainer: {
    height: 25,
    width: 25,
    // backgroundColor: 'red',
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bars: {
    width: "100%",
    height: 5,
    backgroundColor: colors.mainColor,
    borderRadius: 20,
    elevation: 5,
  },
  imageBanner: {
    width: "90%",
    marginTop: 15,
    height: 80,
    borderRadius: 20,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
