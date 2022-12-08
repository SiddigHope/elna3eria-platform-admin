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
import { getDeviceToken, goToScreen, ShowSnackbar } from "../../config/functions";
import { login } from "../../config/apis/authentication";
import UserClass from "../../config/authHandler";
import elevations from "../../config/elevations";

const { width, height } = Dimensions.get("window");

export default class SigninForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordPlaceholder: "كلمة المرور",
      emailPlaceholder: "ايميل المتجر",
      passwordToggler: true,
      loading: false,
      showSnackbar: false,
      snackbarText: "",
      snackbarBackgroundColor: "",
    };
  }

  login = async () => {
    const { email, password } = this.state;
    const device_token = await getDeviceToken()
    if (email && password) {
      this.setState({
        loading: true,
      });

      const data = {
        email,
        password,
        device_token
      };
      const stored = await login(data);
      if (stored) {
        this.setState({
          loading: false,
        });
        console.log(stored.is_verified);
        UserClass.setUser(stored);
        if (!stored.is_verified) {
          goToScreen("Verification", this.props.navigation, { email });
          return;
        }
        goToScreen("Tabs", this.props.navigation);
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

  render() {
    return (
      <View style={styles.container}>
        <TextInputRender
          type="email"
          ref={(email) => (this.emailInput = email)}
          refFunction={this.emailInput}
          placeholder={this.state.emailPlaceholder}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInputRender
          type="password"
          ref={(password) => (this.passwordInput = password)}
          refFunction={this.passwordInput}
          placeholder={this.state.passwordPlaceholder}
          secureTextEntry={this.state.passwordToggler}
          onChangeText={(password) => this.setState({ password })}
        />
        <Pressable onPress={this.login}>
          <LinearGradient
            colors={["#F4C343", colors.mainColor]}
            style={[styles.btn, elevations[5]]}
          >
            {this.state.loading ? (
              <ActivityIndicator color={colors.white} size="large" />
            ) : (
              <Text style={styles.btnText}> {"تسجيل الدخول"} </Text>
            )}
          </LinearGradient>
        </Pressable>

        <View style={styles.nestedText}>
          <Text style={styles.parentText}>
            {" بالضغط على تسجبل الدخول أوكد انني قرات ووافقت على"}
            <Text onPress={() => goToScreen("About", this.props.navigation, { type: "terms" })} style={styles.childText}>
              {" الشروط و الاحكام"}
            </Text>
            {" بالاضافة الى"}
            <Text onPress={() => goToScreen("About", this.props.navigation, { type: "privacy" })} style={styles.childText}>
              {" سياسة الخصوصية"}
            </Text>
          </Text>
        </View>

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
  btn: {
    marginVertical: 20,
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
  nestedText: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10
  },
  parentText: {
    fontFamily: fonts.tajawalR,
    fontSize: 12,
    color: colors.grey,
    lineHeight: 30,
    textAlign: "right"
    // backgroundColor: "red"
  },
  childText: {
    fontFamily: fonts.tajawalB,
    fontSize: 12,
    color: colors.softBlack,
    textDecorationLine: 'underline'
  },

});

//#FF1D3D
