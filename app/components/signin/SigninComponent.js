import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
} from "react-native";
import { goToScreen } from "../../config/functions";
import { colors, fonts } from "../../config/vars";
import SigninForms from "./SigninForms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get("window");

export default class SigninComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _goToScreen = () => {
    goToScreen("Signup", this.props.navigation);
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={require("./../../../assets/images/woman-holding-various-shopping-bags-copy-space.jpg")}
            style={styles.header}
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
                    onPress={this._goToScreen}
                    style={styles.signupBtn}
                  >
                    <Text style={styles.signupBtnText}> {"سجل الأن"} </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ImageBackground>
          {/* <View style={styles.formContainer}> */}
          <SigninForms navigation={this.props.navigation} />
          {/* </View> */}
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
  },
  subtitle: {
    color: "#FFF",
    fontFamily: fonts.tajawalR,
    fontSize: 16,
  },
  subSubtitle: {
    color: colors.softBlack,
    fontFamily: fonts.tajawalR,
    fontSize: 14,
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
});