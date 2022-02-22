import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../../assets/images/avatar.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        height: 40,
        width: 40,
        borderRadius: 20,
        elevation: 5
    },
    image:{
        height: 40,
        width: 40,
        borderRadius: 20
    }
})