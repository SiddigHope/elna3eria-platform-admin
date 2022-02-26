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
import { elevations } from '../../../config/elevations';

export default class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: false,
    };
  }

  componentDidMount() {
    this.checkSelected();
    const navigation = this.props.navigation;
    navigation.addListener("blur", () => {
      this.setState({
        itemSelected: false,
      });
    });
  }

  checkSelected = () => {
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
    this.props.setStores(this.props.item.item.products);
    setItemSelected(this.props.item.index);
    this.setState({
      itemSelected: true,
    });
  };

  render() {
    const item = this.props.item.item;
    return (
      <Pressable onPress={this._setStore} style={[styles.container]}>
        <View
          style={[
            styles.item,
            elevations[5],
            this.state.itemSelected
              ? { backgroundColor: colors.mainColor }
              : {},
          ]}
        >
          <Text numberOfLines={1} style={styles.title}>
            {" "}
            {item.name}{" "}
          </Text>
          <View style={[styles.image, elevations[3], {elevation: 3, marginLeft: 10}]} >
            <Image
              borderRadius={10}
              source={{ uri: item.image }}
              style={styles.image}
            />
          </View>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    justifyContent: "center",
    // backgroundColor: "red",
  },
  item: {
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontFamily: "Tajawal-Regular",
    color: colors.ebony,
    fontSize: 12,
    maxWidth: "90%",
    textAlign: "center",
    marginBottom: 2,
  },
  image: {
    width: 25,
    height: 25,
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "flex-end",
  },
});
