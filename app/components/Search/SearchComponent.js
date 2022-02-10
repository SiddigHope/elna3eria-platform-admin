import React, { Component } from "react";
import { View, Text } from "react-native";
import Input from "./Input";

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  onChangeText = (text) => {
    this.setState({
      text,
    });
  };

  render() {
    return (
      <View>
        <Input text={this.state.text} onChangeText={this.onChangeText} />
      </View>
    );
  }
}
