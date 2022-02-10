import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BannerList from "../components/home/BannerList";
import ProductsList from "../components/StoreProducts/products/ProductsList";
import Header from "../components/StoreProducts/header/Header";
import CategoriesList from "../components/StoreProducts/categories/CategoriesList";
import { colors } from "../config/vars";
import { productsSearch } from "../config/data";
import { goToScreen } from "../config/functions";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      searching: false,
      searchText: "",
    };
  }

  setStores = (stores) => {
    this.setState({
      stores,
    });
  };

  onChangeText = async (text) => {
    console.log(text);
    this.setState({
      searchText: text,
      searching: true,
      stores: await productsSearch(this.props.route.params.store.id, text),
    });
  };

  closeSearching = () => {
    this.setState({
      searching: false,
    });
  };

  goToScreen = (store, product) => {
    goToScreen("ProductDetails", this.props.navigation, { store, product });
  };

  _listHeader = () => (
    <Header
      closeSearching={this.closeSearching}
      searching={this.state.searching}
      onChangeText={this.onChangeText}
    />
  );

  _renderItem = () => (
    <CategoriesList
      store={this.props.route.params.store}
      searching={this.state.searching}
      setStores={this.setStores}
      navigation={this.props.navigation}
    />
  );

  _listFooter = () => (
    //this margin:65 is for elevating the elements upper than the bottom tabs because its absolute
    <View style={{ marginBottom: 65 }}>
      <ProductsList
        goToScreen={this.goToScreen}
        stores={this.state.stores}
        store={this.props.route.params.store}
        navigation={this.props.navigation}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[1]}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this._listFooter}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this._listHeader}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
