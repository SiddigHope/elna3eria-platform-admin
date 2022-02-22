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
import RNPickerSelect from "react-native-picker-select";
import { Snackbar } from "react-native-paper";
import { goToScreen, ShowSnackbar } from "../../config/functions";
import { newStore } from "../../config/apis/authentication";

const { width, height } = Dimensions.get("window");

export default class SignupForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      owner: "",
      department: "",
      storeName: "",
      password: "",
      passwordPlaceholder: "كلمة المرور",
      emailPlaceholder: "ايميل المتجر",
      ownerPlaceholder: "مالك المتجر",
      storeNamePlaceholder: "اسم المتجر",
      departmentPlaceholder: "قسم المتجر",
      passwordToggler: true,
      loading: false,
      departments: this.props.departments.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      showSnackbar: false,
      snackbarText: "",
      snackbarBackgroundColor: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.departments.length != nextProps.departments.length) {
      this.setState({
        departments: nextProps.departments.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      })
    }
  }

  getData = async () => {
    this.setState({
      departments: await this.props.departments.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    });
  };

  storeData = async () => {
    const { storeName, department, owner, email, password } = this.state;

    if (storeName && owner && email && password) {
      this.setState({
        loading: true,
      });

      const data = {
        store_name: storeName,
        department_id: department,
        owner_name: owner,
        email: email,
        password: password,
      };
      const stored = await newStore(data);
      if (stored) {
        this.setState({
          loading: false,
        });
        goToScreen("Signin", this.props.navigation);
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
        snackbarText: "عفوا يجب ملئ جميع الحقول",
        showSnackbar: true,
      });
    }
  };


  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TextInputRender
            ref={(owner) => (this.ownerInput = owner)}
            refFunction={this.ownerInput}
            placeholder={this.state.ownerPlaceholder}
            onChangeText={(owner) => this.setState({ owner })}
          />
          <View style={styles.textInputContainer}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              textInputProps={{ placeholderTextColor: colors.mainColor }}
              placeholder={{ label: "قسم المتجر", value: "0" }}
              style={{
                inputAndroid: styles.textInput,
                inputIOS: styles.textInput,
                placeholder: { color: colors.mainColor },
              }}
              onValueChange={(value) => this.setState({ department: value })}
              items={this.state.departments}
            />
          </View>
          <TextInputRender
            ref={(storeName) => (this.storeNameInput = storeName)}
            refFunction={this.storeNameInput}
            placeholder={this.state.storeNamePlaceholder}
            onChangeText={(storeName) => this.setState({ storeName })}
          />
          <TextInputRender
            ref={(email) => (this.emailInput = email)}
            refFunction={this.emailInput}
            placeholder={this.state.emailPlaceholder}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInputRender
            ref={(password) => (this.passwordInput = password)}
            refFunction={this.passwordInput}
            placeholder={this.state.passwordPlaceholder}
            secureTextEntry={this.state.passwordToggler}
            onChangeText={(password) => this.setState({ password })}
          />
          <Pressable onPress={this.storeData}>
            <LinearGradient
              colors={[colors.mainColor, "#FF1D3D"]}
              style={styles.btn}
            >
              {this.state.loading ? (
                <ActivityIndicator color={colors.white} size="large" />
              ) : (
                <Text style={styles.btnText}> {"تأكيد العملية"} </Text>
              )}
            </LinearGradient>
          </Pressable>
          <ShowSnackbar
            backgroundColor={this.state.snackbarBackgroundColor}
            text={this.state.snackbarText}
            show={this.state.showSnackbar}
            closeSnackbar={() => this.setState({ showSnackbar: false })}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: (height * 65) / 100,
    width: (width * 95) / 100,
    paddingHorizontal: 10,
    // backgroundColor: "#e3e3e3",
    justifyContent: "center",
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
  textInputContainer: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 5,
    marginVertical: 10,
  },
  textInput: {
    height: "100%",
    color: colors.mainColor,
    fontFamily: fonts.tajawalR,
    fontSize: 16,
    textAlign: "center",
  },
});

//#FF1D3D
