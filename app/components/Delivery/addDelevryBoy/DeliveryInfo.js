import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { colors } from "../../../config/vars";
import OrderButton from "./OrderButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import DeliveryForms from "./DeliveryForms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImageComponent from './ImageComponent';

const { width, height } = Dimensions.get("window");

export default class DeliveryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <DeliveryForms
            item={this.props.item}
            navigation={this.props.navigation}
            categories={this.props.categories}
            screen={this.props.screen}
            makeEditable={this.props.makeEditable}
            editable={this.props.editable}
            submitForm={(data) => this.props.submitForm(data)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    width,
    height: (height * 60) / 100,
    // backgroundColor: colors.whiteF7,
    // elevation: 10,
    padding: 20,
    paddingTop: 20,
  },
  infoContainer: {
    // backgroundColor: "#e3e3e3",
    // flex: 1,
  },
  headerInfo: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontFamily: "Tajawal-Bold",
    fontSize: 20,
    color: colors.softBlack,
  },
  ratingText: {
    fontFamily: "Tajawal-Bold",
    color: "grey",
    fontSize: 18,
    marginLeft: 5,
  },
  miniRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontFamily: "Tajawal-Bold",
    color: colors.softGreen,
    fontSize: 24,
    textAlign: "right",
    marginBottom: 10,
  },
  ratingStars: {
    flexDirection: "row",
  },
  ratingCount: {
    color: "grey",
    fontFamily: "Tajawal-Regular",
    fontSize: 16,
    marginRight: 5,
  },
  desc: {
    fontFamily: "Tajawal-Regular",
    fontSize: 18,
    textAlign: "right",
    color: colors.softBlack,
    marginVertical: 10,
  },
  textInputContainer: {
    backgroundColor: "#F0F1F3",
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
    minHeight: 100,
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    height: 100,
    textAlign: "right",
    color: "#515C6F",
    padding: 20,
    fontSize: 14,
    fontFamily: "Tajawal-Regular",
    textAlignVertical: "top",
    // backgroundColor: "red",
  },
});
