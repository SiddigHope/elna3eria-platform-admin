import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import elevations from '../../config/elevations';
import { goToScreen } from '../../config/functions';
import { fonts, colors } from '../../config/vars';

export default class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goToScreen = () => {
        const item = this.props.item
        goToScreen(item.onPress, this.props.navigation)
    }

    render() {
        const item = this.props.item
        return (
            <Pressable onPress={this.goToScreen} style={styles.container}>
                {item.icon}
                <Text style={styles.title}> {item.title} </Text>
                <Icon
                    name="chevron-thin-left"
                    size={20}
                    style={{ marginLeft: 10 }}
                    color={colors.white}
                />
            </Pressable>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: "100%",
        height: 60,
        elevation: 5,
    },
    title: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: "center",
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.white,
        marginHorizontal: 20
    }
})