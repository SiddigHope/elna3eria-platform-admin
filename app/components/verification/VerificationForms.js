import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { colors, fonts } from "../../config/vars";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInputRender from "./TextInputRender";
import { goToScreen, ShowSnackbar } from "../../config/functions";
import { resendCode, verify } from "../../config/apis/authentication";
import UserClass from "../../config/authHandler";

const { width, height } = Dimensions.get("window");

export default class VerificationForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordPlaceholder: "ادخل رمز التحقق",
      passwordToggler: true,
      loading: false,
      showSnackbar: false,
      snackbarText: "",
      snackbarBackgroundColor: "",
      resent: true,
    };
    this.resendOTP = this.resendOTP.bind(this)
  }

  componentDidMount() {
    this.setState({
      email: this.props.email,
    });
  }

  verify = async () => {
    const { password } = this.state;
    if (password) {
      this.setState({
        loading: true,
      });

      const data = {
        code: password,
      };
      const stored = await verify(data);
      if (stored) {
        this.setState({
          loading: false,
        });
        goToScreen("Home", this.props.navigation);
      } else {
        this.setState({
          loading: false,
          snackbarBackgroundColor: colors.ratingYellow,
          snackbarText: "حدث خظا ما اعد المحاولة مرة اخري",
          showSnackbar: true,
        });
      }
    } else {
      this.setState({
        loading: false,
        snackbarBackgroundColor: colors.danger,
        snackbarText: "عفوا تأكد من صحة البيانات",
        showSnackbar: true,
      });
    }
  };

  resendOTP = async () => {
    const resent = await resendCode();
    if (resent) {
      this.setState({
        resent: true,
        loading: false,
        snackbarBackgroundColor: colors.success,
        snackbarText: "تم ارسال الرمز",
        showSnackbar: true,
      });
      setTimeout(() => {
        this.setState({
          resent: false,
        });
      }, 50000);
    } else {
      this.setState({
        resent: false,
        loading: false,
        snackbarBackgroundColor: colors.danger,
        snackbarText: "لم يتم ارسال الرمز حاول مرة اخرى",
        showSnackbar: true,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.labelText}>
            {" "}
            {"تم ارسال رمز التحقق على الايميل"}{" "}
          </Text>
          <Text style={styles.email}>{this.state.email}</Text>
        </View>
        <TextInputRender
          ref={(password) => (this.passwordInput = password)}
          refFunction={this.passwordInput}
          placeholder={this.state.passwordPlaceholder}
          secureTextEntry={this.state.passwordToggler}
          resent={this.state.resent}
          resendOTP={this.resendOTP}
          onChangeText={(password) => this.setState({ password })}
        />
        <Pressable onPress={this.verify}>
          <LinearGradient
            colors={["#F4C343", colors.mainColor]}
            style={styles.btn}
          >
            {this.state.loading ? (
              <ActivityIndicator color={colors.white} size="large" />
            ) : (
              <Text style={styles.btnText}> {"تأكيد العملية"} </Text>
            )}
          </LinearGradient>
        </Pressable>
        {/* {!this.state.resent && (
          <Pressable onPress={this.resendOTP}>
            <Text style={styles.resend}> {"اعادة ارسال الرمز"} </Text>
          </Pressable>
        )} */}
        <ShowSnackbar
          backgroundColor={this.state.snackbarBackgroundColor}
          text={this.state.snackbarText}
          show={this.state.showSnackbar}
          closeSnackbar={() => this.setState({ showSnackbar: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: (height * 50) / 100,
    width: (width * 95) / 100,
    paddingHorizontal: 10,
    // backgroundColor: "#e3e3e3",
    justifyContent: "center",
    // elevation: 5
  },
  labelText: {
    fontFamily: fonts.tajawalR,
    fontSize: 16,
    textAlign: "center",
    color: colors.softBlack,
  },
  email: {
    fontFamily: fonts.tajawalB,
    textAlign: "center",
    fontSize: 18,
    color: colors.softBlack,
  },
  btn: {
    marginVertical: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FF1D3D",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  btnText: {
    color: colors.white,
    fontFamily: fonts.tajawalR,
    fontSize: 16,
  },
  resend: {
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    // textAlign: "center",
    color: colors.ebony,
    marginTop: 10,
  },
});

//#FF1D3D
