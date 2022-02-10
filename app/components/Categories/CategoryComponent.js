import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const item = this.props.item.item;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[
            item.gradient.top,
            item.gradient.middle,
            item.gradient.bottom,
          ]}
          style={styles.item}
        >
          <Image source={item.icon} style={styles.icon} />
        </LinearGradient>
        <Text style={styles.title}> {item.title} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  item: {
    marginTop: 10,
    height: 65,
    width: 65,
    borderRadius: 32.5,
    backgroundColor: "#FF7676",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  title: {
    fontFamily: "Tajawal-Regular",
    color: "#515B6E",
    fontSize: 15,
    marginTop: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
