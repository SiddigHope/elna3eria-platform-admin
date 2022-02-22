import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Products from "../components/products/products/Products";
import { getProducts } from '../config/apis/products/gets';
import { colors } from '../config/vars';
import Header from '../config/header/Header';

export default class ProductManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getData()
    const navigation = this.props.navigation
    navigation.addListener("focus", () => {
      this.getData()
    })
  }

  componentWillUnmount() {
    const navigation = this.props.navigation
    navigation.removeListener("focus")
  }

  getData = async () => {
    this.setState({
      products: await getProducts()
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
