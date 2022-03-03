import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { elevations } from '../elevations';
import { colors } from '../../../.expo-shared/app/config/vars';

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props
    // console.log("user")
    // console.log(user)
    return (
      <View style={[styles.container, elevations[5]]}>
        <Image style={styles.image} source={user ? { uri: user.image } : require('../../../assets/images/avatar.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: colors.white
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
})