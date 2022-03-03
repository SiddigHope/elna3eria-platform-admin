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
                {type == "deliveryFee" && (
                    <Text style={styles.deliveryFee} > {"SR"} </Text>
                )}
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
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },
    textInput: {
        flex: 1,
        width: "100%",
        height: "100%",
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        // paddingHorizontal: 20,
        color: colors.softBlack,
        textAlign: 'right',
    },
    deliveryFee: {
        // backgroundColor: "red",
        flex: 0.3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.success
    }
})