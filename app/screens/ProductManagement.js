import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Products from "../components/products/products/Products";
import { getCategories, getProducts } from '../config/apis/products/gets';
import { colors } from '../config/vars';
import Header from '../config/header/Header';
import CatList from '../components/categories/CatList';

export default class ProductManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsCopy:[],
      categories: [],
      selected:-1
    };
  }

  componentDidMount() {
    this.getData()
    const navigation = this.props.navigation
    navigation.addListener("focus", () => {
      if (this.state.status != -1) {
        this.filterProducts(this.state.status)
    } else {
        this.getData()
    }
    })
  }

  componentWillUnmount() {
    const navigation = this.props.navigation
    navigation.removeListener("focus")
  }

  getData = async () => {
    const products = await getProducts()
    const categories = await getCategories()
    this.setState({
      products,
      productsCopy:products,
      categories
    })
  }

  filterProducts = async (selected) => {
    console.log("filtering")
    console.log(selected)
    this.setState({
        products: selected == 0? this.state.productsCopy : this.state.productsCopy.filter((product) => product.category_id == this.state.categories[selected].id),
        selected,
    })
}

  render() {
    return (
      <View style={styles.container}>
        <Header
          screen="orders"
          title="منتجاتي"
          closeSearching={() => console.log("closing")}
          searching={false}
          onChangeText={(text) => console.log(text)}
        />
        <CatList selected={this.state.selected} changeSelected={this.filterProducts} data={this.state.categories} />
        <Products getData={this.getData} products={this.state.products} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    width : "100%",
    backgroundColor: colors.whiteF7,
  },
});
