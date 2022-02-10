import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import LatestComponent from "./LatestComponent";
import { latest } from "../../config/data";

const { width, height } = Dimensions.get("window");

export default class LatestList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = (item, index) => (
    <LatestComponent item={item} index={index} />
  );

  _itemSeparator = () => <View style={{ height: 10 }} />;

  _listFooter = () => <View style={{ height: 20 }} />;

  _listHeader = () => <View style={{ height: 20 }} />;

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}> {"Latest"} </Text> */}
        <FlatList
          data={latest}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          ItemSeparatorComponent={this._itemSeparator}
          ListFooterComponent={this._listFooter}
          ListHeaderComponent={this._listHeader}
          renderItem={this._renderItem}
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
    // alignItems: "center",
    paddingHorizontal: 10
  },
  title: {
    fontFamily: "Tajawal-Bold",
    fontSize: 24,
    color: "#515C6F",
    marginHorizontal: 25,
    marginVertical: 5,
  },
});
