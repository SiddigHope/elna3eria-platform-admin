import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { colors, fonts } from "../../config/vars";

export default class TextInputRender extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          secureTextEntry={
            this.props.placeholder == "كلمة المرور"
              ? this.props.secureTextEntry
              : false
          }
          placeholder={this.props.placeholder}
          // onSubmitEditing={() => this.props.refFunction.focus()}
          placeholderTextColor={colors.softBlack}
          onChangeText={(text) => this.props.onChangeText(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 5,
    marginVertical: 10,
  },
  textInput: {
    height: "100%",
    color: colors.softBlack,
    fontFamily: fonts.tajawalR,
    fontSize: 16,
    textAlign: "center",
  },
});
