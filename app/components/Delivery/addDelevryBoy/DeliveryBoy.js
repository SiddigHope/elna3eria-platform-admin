import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { getCategories } from "../../../config/apis/products/gets";
import { colors } from "../../../config/vars";
import ImageComponent from "./ImageComponent";
import DeliveryInfo from "./DeliveryInfo";
import { goToScreen } from '../../../config/functions';
import { addDeliveryBoy, updateDeliveryBoy } from "../../../config/apis/delivery/posts";
import MiniHeader from "../../MiniHeader";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class DeliveryBoy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      image: {},
      item: this.props.route.params.screen == "edit" ? this.props.route.params.item : [],
      screen: this.props.route.params.screen,
      editable: this.props.route.params.screen == "edit" ? false : true,
      title: this.props.route.params.screen == "edit" ? "بيانات الموظف" : "اضافة موظف توصيل",
      loading: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({
      categories: await getCategories(),
    });
  };

  submitForm = async (data) => {
    this.setState({
      loading: true
    })
    const formData = new FormData()

    if (!this.state.image) {
      // show error note
      this.setState({
        loading: false
      })
      console.log("there's no image with this request");
      return
    }
    // console.log(this.state.image.uri)
    // return

    formData.append("name", data.name)
    formData.append("national_id", data.national_id)
    formData.append("email", data.email)
    formData.append("phone", data.phone)
    formData.append("whatsapp", data.whatsapp)
    formData.append("address", data.address)
    if (this.state.image.uri) {
      formData.append("image", this.state.image)
    }

    let stored = undefined
    if (this.state.screen == "edit") {
      stored = await updateDeliveryBoy(formData, this.state.item.id)
    } else {
      stored = await addDeliveryBoy(formData)
    }
    this.setState({
      loading: false
    })
    if (stored) {
      goToScreen("Delivery", this.props.navigation)
    }

  }

  render() {
    return (
      <View contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} style={styles.container}>
        {/* <StatusBar translucent={false} style="dark" /> */}
        <MiniHeader title={this.state.title} navigation={this.props.navigation} />
        <KeyboardAwareScrollView>
          <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
            <ImageComponent
              screen={this.state.screen}
              editable={this.state.editable}
              item={this.state.item}
              onChange={(image) => this.setState({ image })}
            />
            <DeliveryInfo
              categories={this.state.categories.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              loading={this.state.loading}
              makeEditable={() => this.setState({ editable: true })}
              editable={this.state.editable}
              item={this.state.item}
              screen={this.state.screen}
              submitForm={(data) => this.submitForm(data)}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteF7,
    // justifyContent: "center"
  },
});
