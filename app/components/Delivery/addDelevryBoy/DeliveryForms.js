import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { colors, fonts } from "../../../config/vars";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInputRender from "./TextInputRender";
import { goToScreen, ShowSnackbar } from "../../../config/functions";
import RNPickerSelect from "react-native-picker-select";

const { width, height } = Dimensions.get("window");

export default class ProductForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      namePlaceholder: 'اسم الموظف',
      national_id: "",
      nationalIdPlaceholder: 'رقم الهوية',
      email: '',
      emailPlaceholder: 'الايميل',
      phone: '',
      phonePlaceholder: 'رقم الهاتف',
      whatsapp: '',
      whatsappPlaceholder: 'الرقم الخاص بالواتساب',
      loading: false,
      showSnackbar: false,
      snackbarText: "",
      snackbarBackgroundColor: "",
      item: [],
    };
  }

  componentDidMount() {
    if (this.props.screen == "edit") {
      this.getData()
    }
  }

  getData = () => {
    this.setState({
      name: this.props.item.name,
      national_id: String(this.props.item.national_id),
      phone: this.props.item.phone,
      whatsapp: this.props.item.whatsapp,
      email: this.props.item.email,
    });
  }

  submitForm = async () => {
    const { name, national_id, email, phone, whatsapp } = this.state;
    if (name && national_id && email && phone) {
      // this.setState({
      //   loading: true
      // })
      const data = {
        name,
        phone,
        national_id,
        email,
        whatsapp,
      }
      this.props.submitForm(data)
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
          type="name"
          value={this.state.name}
          placeholder={this.state.namePlaceholder}
          editable={this.props.editable}
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInputRender
          type="national_id"
          editable={this.props.editable}
          placeholder={this.state.nationalIdPlaceholder}
          value={this.state.national_id}
          onChangeText={(national_id) => this.setState({ national_id })}
        />
        <TextInputRender
          type="email"
          value={this.state.email}
          editable={this.props.editable}
          placeholder={this.state.emailPlaceholder}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInputRender
          type="phone"
          value={this.state.phone}
          editable={this.props.editable}
          placeholder={this.state.phonePlaceholder}
          onChangeText={(phone) => this.setState({ phone })}
        />
        <TextInputRender
          type="phone"
          value={this.state.whatsapp}
          editable={this.props.editable}
          placeholder={this.state.whatsappPlaceholder}
          onChangeText={(whatsapp) => this.setState({ whatsapp })}
        />

        <Pressable onPress={this.props.editable ? this.submitForm : this.props.makeEditable}>
          <LinearGradient
            colors={[colors.mainColor, colors.mainColor, "#F4C343"]}
            style={styles.btn}
          >
            {this.state.loading ? (
              <ActivityIndicator color={colors.white} size="large" />
            ) : this.props.editable ? (
              <Text style={styles.btnText}> {"اضافة الموظف"} </Text>
            ) : (
              <Text style={styles.btnText}> {"تعديل بيانات الموظف"} </Text>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: (height * 50) / 100,
    // width: (width * 95) / 100,
    paddingHorizontal: 10,
    // backgroundColor: "#e3e3e3",
    // justifyContent: "center",
    // elevation: 5
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
    color: colors.softBlack,
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    textAlign: "center",
  },
  btn: {
    marginVertical: 10,
    height: 50,
    borderRadius: 15,
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
  rowInputs: {
    flexDirection: "row-reverse",
    alignItems: "center",
    // backgroundColor: 'red',
    justifyContent: 'space-between'
  },
  phoneContainer: {
    flex: 0.69,
    // backgroundColor: 'blue'
  },
  priceContainer: {
    flex: 0.3,
    // backgroundColor: 'blue'
  }
});

//#FF1D3D
