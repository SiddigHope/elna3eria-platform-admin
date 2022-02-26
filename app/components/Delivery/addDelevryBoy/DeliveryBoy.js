import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getCategories } from "../../../config/apis/products/gets";
import { colors } from "../../../config/vars";
import ImageComponent from "./ImageComponent";
import DeliveryInfo from "./DeliveryInfo";
import { goToScreen } from '../../../config/functions';
import { addDeliveryBoy, updateDeliveryBoy } from "../../../config/apis/delivery/posts";
import MiniHeader from "../../MiniHeader";

export default class DeliveryBoy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      image: {},
      item: this.props.route.params.screen == "edit" ? this.props.route.params.item : [],
      screen: this.props.route.params.screen,
      editable: this.props.route.params.screen == "edit" ? false : true
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
    const formData = new FormData()

    if (!this.state.image) {
      // show error note
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

    if (stored) {
      goToScreen("Delivery", this.props.navigation)
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} style={styles.container}>
        {/* <StatusBar translucent={false} style="dark" /> */}
        <MiniHeader title={""} navigation={this.props.navigation} />
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
          makeEditable={() => this.setState({ editable: true })}
          editable={this.state.editable}
          item={this.state.item}
          screen={this.state.screen}
          submitForm={(data) => this.submitForm(data)}
        />
      </ScrollView>
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
