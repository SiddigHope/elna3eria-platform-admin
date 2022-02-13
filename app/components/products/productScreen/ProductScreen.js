import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getCategories } from "../../../config/apis/products/gets";
import { storeProduct, updateProduct } from "../../../config/apis/products/posts";
import { colors } from "../../../config/vars";
import ImageComponent from "./ImageComponent";
import ProductInfo from "./ProductInfo";
import { goToScreen } from '../../../config/functions';

export default class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      image: {},
      item: this.props.route.params.screen == "edit" ? this.props.route.params.item : [],
      screen: this.props.route.params.screen,
      editable: this.props.route.params.screen == "edit" ? false : true
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({
      categories: await getCategories(),
    });
  };

  submitForm = async (data) => {
    const formData = new FormData()

    if (!this.state.image) {
      // show error note
      return
    }
    // console.log(this.state.image.uri)
    // return

    formData.append("name", data.name)
    formData.append("category_id", data.category)
    formData.append("description", data.desc)
    formData.append("price", data.price)
    if (this.state.image.uri) {
      formData.append("image", this.state.image)
    }

    let stored = undefined
    if (this.state.screen == "edit") {
      stored = await updateProduct(formData, this.state.item.id)
    } else {
      stored = await storeProduct(formData)
    }

    if (stored) {
      goToScreen("ProductManagement", this.props.navigation)
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar translucent style="dark" />
        <ImageComponent
          screen={this.state.screen}
          editable={this.state.editable}
          item={this.state.item}
          onChange={(image) => this.setState({ image })}
        />
        <ProductInfo
          categories={this.state.categories.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          makeEditable={() => this.setState({ editable: true })}
          editable={this.state.editable}
          item={this.state.item}
          screen={this.state.screen}
          submitForm={(data) => this.submitForm(data)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
