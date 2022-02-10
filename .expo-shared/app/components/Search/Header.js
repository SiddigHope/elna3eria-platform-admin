import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.header}>
        <Icon name="chevron-back-outline" size={30} color="#FF6969" />
        <View style={styles.inputContainer}>
          <Icon
            style={styles.icon}
            name="search-outline"
            size={12}
            color="#515C6F"
          />
          <TextInput
            style={styles.textFull}
            placeholder={"Search Something"}
            placeholderTextColor="#515C6F"
            onChangeText={(text) => props.onChangeText(text)}
          />
        </View>
        <Icon1 name="filter-outline" size={30} color="#727C8E" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textFull: {
    // width: "100%",
    height: 35,
    // backgroundColor: "#F0F1F3",
    fontFamily: "Tajawal-Regular",
    color: "#515C6F",
    textAlign: "center",
    borderRadius: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F1F3",
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: "#e3e3e3",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
