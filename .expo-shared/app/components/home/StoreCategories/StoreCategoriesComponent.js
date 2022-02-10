import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, itemSelected, setItemSelected } from "../../../config/vars";

export default class StoreCategoriesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: false,
    };
  }

  componentDidMount() {
    this.checkSelected();
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.item.index !== itemSelected && this.state.itemSelected) {
      this.setState({
        itemSelected: false,
      });
    }
  }

  checkSelected = () => {
    console.log();
    if (itemSelected == -1 && this.props.item.index == 0) {
      this._setStore();
    } else if (itemSelected == this.props.item.index) {
      this._setStore();
    } else {
      this.setState({
        itemSelected: false,
      });
    }
  };

  _setStore = () => {
    this.props.setStores(this.props.item.item.stores);
    setItemSelected(this.props.item.index);
    this.setState({
      itemSelected: true,
    });
  };

  render() {
    const item = this.props.item.item;
    return (
      <Pressable onPress={this._setStore} style={styles.container}>
        <View
          style={this.state.itemSelected ? styles.itemSelected : styles.item}
        >
          <ImageBackground
            borderRadius={10}
            source={{ uri: item.image }}
            style={
              this.state.itemSelected ? styles.imageSelected : styles.image
            }
          >
            <Text numberOfLines={1} style={styles.title}>
              {" "}
              {item.name}{" "}
            </Text>
          </ImageBackground>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    marginTop: 10,
    justifyContent: "center",
    // backgroundColor: 'red',
  },
  item: {
    height: 80,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  itemSelected: {
    height: 95,
    width: 95,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontFamily: "Tajawal-Regular",
    color: colors.white,
    fontSize: 12,
    maxWidth: "90%",
    textAlign: "center",
    marginBottom: 2,
  },
  image: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  imageSelected: {
    width: 95,
    height: 95,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
