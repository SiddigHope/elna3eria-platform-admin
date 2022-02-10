import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import SearchComponent from '../components/Search/SearchComponent';

const { width, height } = Dimensions.get("window");

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}> Search </Text>
          <SearchComponent navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  title: {
    color: "#515C6F",
    fontFamily: "Tajawal-Bold",
    fontSize: 30,
  },
  content: {
    flex: 1,
    width: width - 40,
    alignSelf: "center",
    // backgroundColor: "red",
  },
});
