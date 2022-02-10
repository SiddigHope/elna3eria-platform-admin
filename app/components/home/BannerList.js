import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import BannerComponent from "./BannerComponent";
import { banner } from "../../config/data";

const { width, height } = Dimensions.get("window");

export default class BannerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = (item, index) => (
    <BannerComponent item={item} index={index} />
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> {"Latest"} </Text>
        <FlatList
          ref={(c) => {
            this._carousel = c;
          }}
          data={banner}
          horizontal
          renderItem={this._renderItem}
          // sliderWidth={width}
          // itemWidth={width - 50}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "blue",
    marginVertical: 10,
    width: "100%",
  },
  title: {
    fontFamily: "Tajawal-Bold",
    fontSize: 24,
    color: "#515C6F",
    marginHorizontal: 25,
    marginVertical: 5,
  },
});
