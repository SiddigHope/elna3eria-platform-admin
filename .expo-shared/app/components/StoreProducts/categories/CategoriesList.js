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
import { productsCategories } from "../../../config/data";
import { goToScreen } from "../../../config/functions";

const { width, height } = Dimensions.get("window");

export default class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storesAndCategories: [],
      itemSelected: -1,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({
      storesAndCategories: await productsCategories(this.props.store.id),
    });
  };

  setItemSelected = (index) => {
    this.setState({
      itemSelected: index,
    });
  };

  _renderItem = (item, index) => (
    <CategoryComponent
      itemSelected={this.state.itemSelected}
      setItemSelected={this.setItemSelected}
      setStores={this.props.setStores}
      item={item}
      navigation={this.props.navigation}
      index={index}
    />
  );

  _itemSeparator = () => <View style={{ width: 20 }} />;

  _goToScreen = () => {
    goToScreen("Categories", this.props.navigation);
  };

  _listFooter = () => <View style={{ width: 20 }} />;

  render() {
    return (
      <View
        style={[
          styles.container,
          this.props.searching ? { display: "none" } : {},
        ]}
      >
        {this.props.searching ? null : (
          <FlatList
            data={this.state.storesAndCategories}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
            inverted
            ListFooterComponent={this._listFooter}
            renderItem={this._renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 55,
    justifyContent: "center",
    // backgroundColor: '#e3e3e3'
  },
});
