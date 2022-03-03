import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView
} from "react-native";
import { colors, fonts } from "../../config/vars";
import SignupForms from "./SignupForms";
import { elevations } from '../../config/elevations';

const { width, height } = Dimensions.get("window");

export default class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: this.props.departments
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.departments.length != nextProps.departments.length) {
      this.setState({
        departments: nextProps.departments
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./../../../assets/images/publicity.jpg")}
          style={[styles.header, elevations[10]]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{"متجر جديد"}</Text>
            <Text style={styles.subtitle}>
              {
                "قم بانشاء متجرك الالكتروني معنا و انتظر تدفق الطلبات في ثواني فقط"
              }
            </Text>
          </View>
        </ImageBackground>
        {/* <View style={styles.formContainer}> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <SignupForms
            departments={this.state.departments}
            navigation={this.props.navigation}
          />
        </ScrollView>
        {/* </View> */}
      </View>
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
    height: (height * 35) / 100,
    justifyContent: "center",
    alignItems: "flex-end",
    elevation: 10,
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.1)",
    maxWidth: "60%",
    marginHorizontal: 10,
    marginTop: 20,
  },
  title: {
    color: "#FFF",
    fontFamily: fonts.tajawalB,
    fontSize: 20,
    marginBottom: 5,
    textAlign: "right"
  },
  subtitle: {
    color: "#FFF",
    fontFamily: fonts.tajawalR,
    fontSize: 16,
    textAlign: "right"
  },
});
