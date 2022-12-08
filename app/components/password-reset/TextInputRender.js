import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import elevations from '../../config/elevations';
import { fonts, colors } from '../../config/vars';

export default class TextInputRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={[styles.container, elevations[5]]}>
                <TextInput
                    placeholder={this.props.placeholder}
                    keyboardType="email-address"
                    value={this.props.value}
                    secureTextEntry={this.props.secureTextEntry}
                    style={styles.textInput}
                    // placeholderTextColor={colo}
                    onChangeText={(text) => this.props.onChange(text)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        backgroundColor: colors.white,
        elevation: 5,
        borderRadius: 15,
        marginVertical: 10
    },
    textInput: {
        width: "100%",
        height: "100%",
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        color: colors.softBlack,
        textAlign: 'center',
        letterSpacing: 2
    }
})