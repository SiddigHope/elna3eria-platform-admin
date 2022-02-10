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
import { categories } from "../../config/data";
import { goToScreen } from "../../config/functions";

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

  _goToScreen = () => {
    goToScreen("Categories", this.props.navigation);
  };

  _listFooter = () => (
    <Pressable
      onPress={this._goToScreen}
      style={{ alignItems: "center", marginLeft: 15, width: 75 }}
    >
      <View style={styles.footer}>
        <Icon name="chevron-right" size={30} color="#FF6969" />
      </View>
      <Text style={styles.footerTitle}> {"See All"} </Text>
    </Pressable>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> {"Categories"} </Text>
        <FlatList
          data={categories.slice(0,3)}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListFooterComponent={this._listFooter}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#e3e3e3",
    width: width,
    height: 150,
  },
  title: {
    fontFamily: "Tajawal-Bold",
    fontSize: 24,
    color: "#515C6F",
    marginHorizontal: 25,
    marginVertical: 5,
  },
  footer: {
    height: 65,
    width: 65,
    borderRadius: 32.5,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    marginTop: 10,
  },
  footerTitle: {
    fontFamily: "Tajawal-Regular",
    color: "#515B6E",
    fontSize: 15,
    marginTop: 5,
  },
});
