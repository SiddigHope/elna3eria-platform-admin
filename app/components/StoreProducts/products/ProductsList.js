import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import ProductComponent from "./ProductComponent";
import { colors } from "../../../config/vars";
import { elevations } from '../../../config/elevations';

const { width, height } = Dimensions.get("window");

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = (item, index) => (
    <ProductComponent
      goToScreen={this.props.goToScreen}
      item={item}
      store={this.props.store}
      index={index}
    />
  );

  _itemSeparator = () => <View style={{ height: 15 }} />;

  _listFooter = () => <View style={{ height: 20 }} />;

  _listHeader = () => (
    <View style={{ width: "100%", alignItems: "flex-end", height: 60 }}>
      <View style={styles.titleContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>
            {this.props.stores.length} {"منتج"}{" "}
          </Text>
        </View>
        <View style={[styles.titleUnderline, elevations[3]]} />
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.stores}
          numColumns={2}
          ListHeaderComponent={this._listHeader}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this._itemSeparator}
          //   ListFooterComponent={this._listFooter}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    // backgroundColor: 'red',
    alignSelf: "center",
  },
  titleContainer: {
    // marginHorizontal: 20,
    alignItems: "flex-end",
    marginBottom: 20,
    width: "40%",
  },
  title: {
    fontFamily: "Tajawal-Bold",
    fontSize: 18,
    color: "grey",
  },
  titleUnderline: {
    height: 3,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "grey",
    width: "50%",
    elevation: 3,
  },
});
