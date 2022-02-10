import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { colors } from "../../config/vars";
import OrderButton from "./OrderButton";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

export default class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.headerInfo}>
            <View style={styles.miniRow}>
              <Icon name="star" color={colors.ratingYellow} size={35} />
              <Text style={styles.ratingText}>
                {"("}
                {this.props.product.rating}
                {")"}
              </Text>
            </View>
            <Text style={styles.name}> {this.props.product.name} </Text>
          </View>
          <ScrollView>
            <Text style={styles.price}>
              {" "}
              {"SR"} {this.props.product.price}{" "}
            </Text>
            <View style={[styles.miniRow, { justifyContent: "flex-end" }]}>
              <Text style={styles.ratingCount}>
                {" "}
                {"6 people ratted this item"}{" "}
              </Text>
              <View style={styles.ratingStars}>
                <Icon name="star" color={colors.ratingYellow} size={25} />
                <Icon name="star" color={colors.ratingYellow} size={25} />
                <Icon name="star" color={colors.ratingYellow} size={25} />
                <Icon name="star" color={colors.ratingYellow} size={25} />
                <Icon name="star" color={colors.ratingYellow} size={25} />
              </View>
            </View>
            <Text style={styles.desc}> {this.props.product.description} </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={"اضف تفاصيل طلبك هنا..."}
                placeholderTextColor="#515C6F"
                onChangeText={(text) => props.onChangeText(text)}
              />
            </View>
            <OrderButton />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    borderTopLeftRadius: 80,
    height: (height * 60) / 100,
    backgroundColor: colors.white,
    bottom: 0,
    elevation: 10,
    padding: 20,
    paddingTop: 50,
  },
  infoContainer: {
    // backgroundColor: "#e3e3e3",
    flex: 1,
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
