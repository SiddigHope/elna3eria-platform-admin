import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

export default class BannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //   console.log(this.props.item)
    const item = this.props.item.item;
    return (
      <ImageBackground
        source={item.image}
        borderRadius={10}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.text}</Text>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}> {"SEE MORE"} </Text>
            <View style={styles.btnIconContainer}>
              <Icon name="chevron-right" size={20} color="#FFF" />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    width: width - 50,
    height: 185,
    alignSelf: "center",
    borderRadius: 20,
  },
  contentContainer: {
    // backgroundColor: '#e3e3e3',
    height: "100%",
    width: "50%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    color: "#FFF",
    fontSize: 18,
    // backgroundColor:'red',
    fontFamily: "Tajawal-Regular",
    textAlign: "left",
    // maxWidth: 1,
    marginLeft: 15
  },
  btnContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 120,
    height: 40,
    borderRadius:30,
    marginTop: 20
  },
  btnText: {
    fontFamily: "Tajawal-Regular",
    fontSize: 12,
    textAlign: "center",
    color: '#727C8E'
  },
  btnIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6969",
  },
});
