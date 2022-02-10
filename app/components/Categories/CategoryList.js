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
import CategoryComponent from "./CategoryComponent";
import { categories } from "./../../config/data";
import { goToScreen } from "./../../config/functions";

const { width, height } = Dimensions.get("window");

export default class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = (item, index) => (
    <CategoryComponent item={item} index={index} />
  );

  _itemSeparator = () => <View style={{ width: 20 }} />;

  _listFooter = () => <View style={{ height: 20 }} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          //   horizontal
          ListFooterComponent={this._listFooter}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F6F8",
    // backgroundColor: "red",
  },
});
