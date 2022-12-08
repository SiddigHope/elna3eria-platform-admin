import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView
} from "react-native";
import { goToScreen } from "../../config/functions";
import { colors, fonts } from "../../config/vars";
import SigninForms from "./SigninForms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { elevations } from '../../config/elevations';

const { width, height } = Dimensions.get("window");

export default class SigninComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _goToScreen = (screen) => {
    goToScreen(screen, this.props.navigation);
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={require("./../../../assets/images/woman-holding-various-shopping-bags-copy-space.jpg")}
            style={[styles.header, elevations[10]]}
          >
            <View style={styles.titleContainer}>
              <View style={styles.platformText}>
                <Text style={styles.title}>{"منصة النعيرية"}</Text>
                <Text style={styles.subtitle}>
                  {"الافضل في ادارة وتسويق منتجاتك اونلاين"}
                </Text>
                <Text style={[styles.subtitle]}>
                  {"قم بتسجيل الدخول بادخال بياناتك بالاسفل"}
                  {/* "قم بانشاء متجرك الالكتروني معنا و انتظر تدفق الطلبات في ثواني فقط" */}
                </Text>
              </View>
              <View style={styles.signupText}>
                <View style={styles.rowView}>
                  <Text style={styles.subSubtitle}>
                    {"ليس لديك متجر معنا؟"}
                  </Text>

                  <Pressable
                    onPress={() => this._goToScreen("Signup")}
                    style={styles.signupBtn}
                  >
                    <Text style={styles.signupBtnText}> {"سجل الأن"} </Text>
                  </Pressable>
                </View>
                <Text style={[styles.forgotPassword, { marginTop: 20 }]}>
                  {"نسيت كلمة المرور؟"}
                  <Text onPress={() => this._goToScreen("PasswordReset")} style={styles.forgotLink}>
                    {" إعادة تعيين"}
                  </Text>
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SigninForms navigation={this.props.navigation} />
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: colors.mainColor,
    width: width,
    height: (height * 50) / 100,
    justifyContent: "center",
    alignItems: "flex-end",
    elevation: 10,
  },
  titleContainer: {
    flex: 1,
    // paddingVertical: '10%',
    justifyContent: "space-around",
    maxWidth: "75%",
    marginHorizontal: 10,
    marginTop: 20,
    // backgroundColor: 'red'
  },
  title: {
    color: "#FFF",
    fontFamily: fonts.tajawalB,
    fontSize: 20,
    marginBottom: 10,
    textAlign: "right"
  },
  subtitle: {
    color: "#FFF",
    fontFamily: fonts.tajawalR,
    fontSize: 16,
    textAlign: "right"
  },
  subSubtitle: {
    color: colors.softBlack,
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    textAlign: "right"
  },
  platformText: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  signupText: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: colors.blackTransparent,
    // marginTop: 20,
  },
  rowView: {
    // flexDirection: "row",
    marginTop: 20,
    alignItems: "flex-end",
    // backgroundColor: 'red',
  },
  signupBtn: {
    padding: 5,
    marginTop: 10,
    borderColor: colors.ebony,
    borderWidth: 0.5,
  },
  signupBtnText: {
    fontFamily: fonts.tajawalB,
    fontSize: 18,
    color: colors.ebony,
  },
  forgotPassword: {
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    color: colors.grey,
  },
  forgotLink: {
    fontFamily: fonts.tajawalB,
    fontSize: 14,
    color: colors.mainColor,
    textDecorationLine: 'underline'
  },
});
