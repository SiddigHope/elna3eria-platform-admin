import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, fonts } from "../../../config/vars";

export default class TextInputRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resent: false,
      loading: false,
    };
  }

  resendOTP = async () => {
    this.setState({
      loading: true,
      resent: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      this.props.resendOTP();
    }, 1000);
    setTimeout(() => {
      this.setState({
        resent: false,
      });
    }, 50000);
  };

  render() {
    return (
      <View style={this.props.type == "desc" ? styles.descInput : styles.textInputContainer}>
        <TextInput
          style={this.props.type == "desc" ? styles.descTextInput : styles.textInput}
          keyboardType={this.props.type == "phone" ? "phone-pad" : this.props.type == "email" ? "email-address" : "default"}
          placeholder={this.props.placeholder}
          multiline={this.props.type == "desc" ? true : false}
          // onSubmitEditing={() => this.props.reFunction.focus()}
          value={this.props.value}
          editable={this.props.editable}
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
    flexDirection: "row",
    backgroundColor: "#FFF",
    elevation: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    height: "100%",
    color: colors.softBlack,
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    // letterSpacing: 10,
    textAlign: "center",
  },
  descInput: {
    height: 100,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#FFF",
    elevation: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  descTextInput: {
    flex: 1,
    height: "100%",
    color: colors.softBlack,
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    padding: 10,
    textAlignVertical: "top",
    // letterSpacing: 10,
    textAlign: "right",
  },
});
