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
import { resendCode } from "../../config/apis/authentication";
import { colors, fonts } from "../../config/vars";
import { elevations } from '../../config/elevations';

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
      <View style={[styles.textInputContainer, elevations[5]]}>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          keyboardType="number-pad"
          placeholder={this.props.placeholder}
          // onSubmitEditing={() => this.props.reFunction.focus()}
          placeholderTextColor={colors.softBlack}
          onChangeText={(text) => this.props.onChangeText(text)}
        />
        {/* {!this.state.resent && ( */}
        <Pressable
          style={styles.resendBtn}
          onPress={this.state.resent ? () => {} : this.resendOTP}
        >
          {this.state.loading ? (
            <ActivityIndicator color={colors.softBlack} size="small" />
          ) : this.state.resent ? (
            <Icon size={25} name="check-circle" color={colors.success} />
          ) : (
            <Text style={styles.resendText}> {"اعادة ارسال"} </Text>
          )}
        </Pressable>
        {/* )} */}
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
    fontSize: 16,
    // letterSpacing: 10,
    textAlign: "center",
  },
  resendText: {
    fontFamily: fonts.tajawalB,
    fontSize: 12,
    color: colors.softBlack,
  },
  resendBtn: {
    height: "100%",
    backgroundColor: colors.softWhite,
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
