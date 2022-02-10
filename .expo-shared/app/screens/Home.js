import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BannerList from "../components/home/BannerList";
import StoresList from "../components/home/Stores/StoresList";
import Header from "../components/home/header/Header";
import StoreCategoriesList from "../components/home/StoreCategories/StoreCategorieList";
import { colors } from "../config/vars";
import { storesSearch } from "../config/data";
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
    // storesSearch(15.641026068455744, 32.47240696301191, text);
    this.setState({
      searchText: text,
      searching: true,
      stores: await storesSearch(15.641026068455744, 32.47240696301191, text),
    });
  };

  closeSearching = () => {
    this.setState({
      searching: false,
    });
  };

  goToScreen = (store) => {
    goToScreen("StoreProducts", this.props.navigation, { store });
  };

  _listHeader = () => (
    <Header
      closeSearching={this.closeSearching}
      searching={this.state.searching}
      onChangeText={this.onChangeText}
    />
  );

  _renderItem = () => (
    <StoreCategoriesList
      searching={this.state.searching}
      setStores={this.setStores}
      navigation={this.props.navigation}
    />
  );

  _listFooter = () => (
    //this margin:65 is for elevating the elements upper than the bottom tabs because its absolute
    <View style={{ marginBottom: 65 }}>
      <StoresList
        goToScreen={this.goToScreen}
        stores={this.state.stores}
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
