import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CategoryList from "../components/Categories/CategoryList";

const { width, height } = Dimensions.get("window");

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#F5F6F8" translucent={false} />
        <Text style={styles.title}> {"All Categories"} </Text>
        <View style={styles.contentContainer}>
          <View styles={styles.flatListContainer}>
            <CategoryList navigation={this.props.navigation} />
          </View>
          <View style={styles.categoryItemsContainer}>
              <View style={styles.categoryItemsList}>

              </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F6F8",
    paddingTop: 20,
    flex: 1,
    width: width,
  },
  title: {
    fontFamily: "Tajawal-Bold",
    fontSize: 24,
    color: "#515C6F",
    marginHorizontal: 25,
    marginVertical: 5,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e3e3e3",
  },
  flatListContainer: {
    backgroundColor: "red",
  },
  categoryItemsContainer: {
    // backgroundColor: "blue",
    flex: 1,
  },
  categoryItemsList: {
    backgroundColor: "blue",
    // flex: 1,
  },
});
