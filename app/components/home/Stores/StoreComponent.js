import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/FontAwesome";
import { colors } from "../../../config/vars";

const { width, height } = Dimensions.get("window");

export default class StoreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let margin = 0;
    if (this.props.item.index % 2 == 0) {
      margin = 10;
    }
    const item = this.props.item.item;
    return (
      <Pressable onPress={() => this.props.goToScreen(item)} style={[styles.container, { marginRight: margin }]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.nameContainer}>
            <View style={styles.miniRow}>
              <Icon name="star" color={colors.ratingYellow} size={15} />
              <Text style={styles.rating}> {item.rating} </Text>
            </View>
            <Text style={styles.title} numberOfLines={1}>
              {" "}
              {item.name}{" "}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.miniRow}>
              <Icon1 name="map-marker" size={10} color={colors.ebony} />
              <View style={styles.miniRow}>
                <Text
                  numberOfLines={1}
                  style={[styles.bottomText, { maxWidth: 35 }]}
                >
                  {item.distance}
                </Text>
                <Text style={[styles.bottomText]}>{"KM"}</Text>
              </View>
            </View>
            <View style={styles.miniRow}>
              <Icon name="delivery-dining" size={10} color={colors.ebony} />
              <Text style={[styles.bottomText, { color: colors.softGreen }]}>
                {" "}
                {item.delivery_fees == 0
                  ? "مجاني"
                  : item.delivery_fees + "SAR"}{" "}
              </Text>
            </View>
            <View style={styles.miniRow}>
              <Icon name="access-time" size={10} color={colors.ebony} />
              <Text style={styles.bottomText}>
                {" "}
                {item.time}
                {"دقيقة"}{" "}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: (width - 40) / 2,
    height: 200,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 2,
  },
  image: {
    width: (width - 40) / 2,
    height: 180,
    borderRadius: 20,
  },
  contentContainer: {
    position: "absolute",
    backgroundColor: colors.white,
    height: "35%",
    width: "100%",
    bottom: 0,
    borderRadius: 20,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
  },
  miniRow: {
    flexDirection: "row",
    // backgroundColor: 'red',
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontFamily: "Tajawal-Bold",
    fontSize: 15,
    color: colors.softBlack,
    //   backgroundColor:'red'
  },
  rating: {
    fontFamily: "Tajawal-Regular",
    fontSize: 12,
    color: colors.softBlack,
  },
  bottomText: {
    fontFamily: "Tajawal-Regular",
    fontSize: 10,
    color: colors.ebony,
    margin: 0,
  },
});
