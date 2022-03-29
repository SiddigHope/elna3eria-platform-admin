import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from '../../config/vars';
import { LinearGradient } from "expo-linear-gradient";
import elevations from "../../config/elevations";

const { width, height } = Dimensions.get("window")

export default class CardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={[this.props.color1, this.props.color2]}
                    style={[styles.container, elevations[5]]}
                >
                    <Text style={styles.title}> {this.props.title} </Text>
                    <Text style={styles.figure} > {this.props.figure} </Text>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: ((width * 85) / 100) / 2,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    figure: {
        fontFamily: fonts.tajawalB,
        fontSize: 24,
        color: colors.ebony
    },
    title: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.grey
    }
})
