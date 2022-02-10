import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default class LatestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const item = this.props.item.item;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.imageCont}>
            <Image source={item.image} resizeMode="contain" style={styles.image} />
          </View>
          <View style={styles.textCont}>
            <Text style={styles.title}> {item.title} </Text>
            <Text style={styles.price}> {item.price} </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    // alignItems: "center",
    flex: 1,
    // width: 100,
    height: 135,
    marginHorizontal: 3,
  },
  item: {
    // marginTop: 10,
    width: 100,
    height: 135,
    borderRadius: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  textCont: {
    flex: 0.25,
    width: "90%",
    // backgroundColor:'blue'
  },
  title: {
    fontFamily: "Tajawal-Regular",
    color: "#515C6F",
    fontSize: 14,
    // marginTop: 5,
  },
  price: {
    fontFamily: "Tajawal-Bold",
    color: "#515C6F",
    fontSize: 12,
    marginBottom: 5,
    // marginTop: 5,
  },
  image: {
    width: 75,
    height: 63,
  },
  imageCont: {
    // backgroundColor: "red",
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
});
