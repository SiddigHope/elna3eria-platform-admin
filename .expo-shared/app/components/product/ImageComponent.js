import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/images/products/coiffeuse_2.png')} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        width,
        height: (height * 55) / 100,
        backgroundColor: 'red'
    },
    image:{
        width: '100%',
        height: '100%',
    }
})
