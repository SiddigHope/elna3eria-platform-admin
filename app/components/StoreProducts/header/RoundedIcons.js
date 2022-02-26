import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../../config/vars";
import { elevations } from '../../../config/elevations';

export default class RoundedIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, elevations[5]]}>
        {this.props.type == "cart" ? (
          <>
            {/* <View>
              <Text>{this.props.items}</Text>
            </View> */}
            <Icon1 name={"cart-outline"} size={25} color={colors.ebony} />
          </>
        ) : (
          <Icon name={"md-chatbox-ellipses"} size={25} color={colors.ebony} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 15,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
  },
});
