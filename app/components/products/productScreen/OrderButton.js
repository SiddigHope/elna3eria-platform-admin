import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from '../../../config/vars';
import { elevations } from '../../../config/elevations';

export default class OrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, elevations[10]]} >
        <Text style={styles.btnText}> {"إضافة"} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.mainColor,
        width: '70%',
        height: 60,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        elevation: 10,
        marginBottom: 20,
    },
    btnText:{
        fontFamily: 'Tajawal-Bold',
        fontSize: 20,
        color: colors.ebony
    }
})