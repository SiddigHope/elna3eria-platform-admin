import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../vars";
import { elevations } from '../elevations';

const { width, height } = Dimensions.get("window");

export default function Input(props) {
  const renderContent = () => {
    return (
      <View style={[styles.container, elevations[5]]}>
        <TextInput
          style={styles.text}
          placeholder={"ابحث عن متجر"}
          placeholderTextColor="#515C6F"
          onChangeText={(text) => props.onChangeText(text)}
        />
        {props.searching ? (
          <TouchableOpacity
            onPress={() => props.closeSearching()}
            style={[styles.closeIconContainer, elevations[2]]}
          >
            <Icon
              // style={styles.icon}
              name="close"
              size={12}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <Icon
            style={styles.icon}
            name="search-outline"
            size={12}
            color="#515C6F"
          />
        )}
      </View>
    );
  };

  return renderContent();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F1F3",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  text: {
    // width: "100%",
    height: 35,
    flex: 1,
    fontFamily: "Tajawal-Regular",
    color: "#515C6F",
    textAlign: "center",
    // paddingRight: 40,
    // backgroundColor: 'red',
    borderRadius: 20,
  },
  icon: {
    position: "absolute",
    right: 20,
  },
  closeIconContainer: {
    backgroundColor: colors.mainColor,
    position: "absolute",
    right: 20,
    padding: 3,
    borderRadius: 20,
    elevation: 2,
  },
});
