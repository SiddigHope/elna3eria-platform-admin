import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "./Header";

const { width, height } = Dimensions.get("window");

export default function Input(props) {
  const [inputStyle, setInputStyle] = useState(styles.text);
  const [inputContainerStyle, setInputContainerStyle] = useState(
    styles.container
  );
  const [focused, setFocused] = useState(false);
  const [modal, setModal] = useState(false);

  const changeStyles = () => {
    setInputContainerStyle(styles.container);
    setInputStyle(styles.text);
  };

  const renderContent = () => {
    return (
      <Pressable onPress={() => setModal(true)} style={styles.container}>
        <TextInput
          style={styles.text}
          placeholder={"Search Something"}
          placeholderTextColor="#515C6F"
          onChangeText={(text) => props.onChangeText(text)}
        />
        <Icon
          style={styles.icon}
          name="search-outline"
          size={12}
          color="#515C6F"
        />
      </Pressable>
    );
  };

  return (
      renderContent()
  );
}

const styles = StyleSheet.create({
  text: {
    // width: "100%",
    height: 35,
    // backgroundColor: "#F0F1F3",
    fontFamily: "Tajawal-Regular",
    color: "#515C6F",
    textAlign: "center",
    borderRadius: 20,
    marginHorizontal: 10,
  },
  textFull: {
    // width: "100%",
    height: 35,
    // backgroundColor: "#F0F1F3",
    fontFamily: "Tajawal-Regular",
    color: "#515C6F",
    textAlign: "center",
    borderRadius: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F1F3",
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  container: {
    marginTop: 20,
    backgroundColor: "#F0F1F3",
    flexDirection: "row-reverse",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  fullContainer: {
    flex: 1,
    height: 170,
    backgroundColor: "#e3e",
    position: "absolute",
    top: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  modalContent: {
    marginTop: 10,
    width: width - 40,
    alignSelf: "center",
  },
  header: {
      backgroundColor: '#e3e3e3',
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
