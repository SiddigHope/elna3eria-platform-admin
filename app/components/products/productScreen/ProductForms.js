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
      namePlaceholder: 'اسم المنتج',
      price: "",
      pricePlaceholder: 'السعر',
      desc: '',
      descPlaceholder: 'اكتب وصف المنتج...',
      category: 0,
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
      price: String(this.props.item.price),
      desc: this.props.item.description,
      category: this.props.item.category_id,
    });
  }

  submitForm = async () => {
    const { name, price, desc, category } = this.state;
    if (name && price && desc && category) {
      // this.setState({
      //   loading: true
      // })
      const data = {
        name,
        category,
        price,
        desc
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
        <View style={styles.rowInputs}>
          <View style={styles.categoryContainer}>
            <View style={styles.textInputContainer}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                textInputProps={{ placeholderTextColor: colors.softBlack }}
                placeholder={{ label: "نوع المنتج", value: "0" }}
                style={{
                  inputAndroid: styles.textInput,
                  inputIOS: styles.textInput,
                  placeholder: { color: colors.softBlack },
                }}
                disabled={!this.props.editable}
                value={this.state.category}
                onValueChange={(value) => this.setState({ category: value })}
                items={this.props.categories}
              />
            </View>
          </View>
          <View style={styles.priceContainer}>
            <TextInputRender
              type="price"
              editable={this.props.editable}
              placeholder={this.state.pricePlaceholder}
              value={this.state.price}
              onChangeText={(price) => this.setState({ price })}
            />
          </View>
        </View>
        <TextInputRender
          type="desc"
          value={this.state.desc}
          editable={this.props.editable}
          placeholder={this.state.descPlaceholder}
          onChangeText={(desc) => this.setState({ desc })}
        />
        <Pressable onPress={this.props.editable ? this.submitForm : this.props.makeEditable}>
          <LinearGradient
            colors={[colors.mainColor, colors.mainColor, "#F4C343"]}
            style={styles.btn}
          >
            {this.state.loading ? (
              <ActivityIndicator color={colors.white} size="large" />
            ) : this.props.editable ? (
              <Text style={styles.btnText}> {"تأكيد العملية"} </Text>
            ) : (
              <Text style={styles.btnText}> {"تعديل بيانات المنتج"} </Text>
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
  categoryContainer: {
    flex: 0.69,
    // backgroundColor: 'blue'
  },
  priceContainer: {
    flex: 0.3,
    // backgroundColor: 'blue'
  }
});

//#FF1D3D
