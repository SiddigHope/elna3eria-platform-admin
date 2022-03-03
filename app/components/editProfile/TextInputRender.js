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
        const type = this.props.type
        return (
            <View style={[styles.container]}>
                <TextInput
                    placeholder={this.props.placeholder}
                    keyboardType={type == "phone" ? "phone-pad" : "default"}
                    value={this.props.value}
                    style={styles.textInput}
                    onChangeText={(text) => this.props.onChange(text)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        height: 60,
        // backgroundColor: colors.white,
        // elevation: 5,
        // borderRadius: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },
    textInput: {
        width: "100%",
        height: "100%",
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        // paddingHorizontal: 20,
        color: colors.softBlack,
        textAlign: 'right',
    }
})