import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { colors, fonts } from '../../../config/vars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DeliveryBoysComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const item = this.props.item.item
        const index = this.props.item.index
        return (
            <Pressable onPress={() => this.props.onPress(item.id, index)} style={[styles.container, this.props.selected == index ? { backgroundColor: colors.softBlue } : {}]}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.name}> {item.name} </Text>
                    <Text style={styles.address}> {"امدرمان امبدة المنصورة"} </Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon name="phone-in-talk" size={20} color={colors.blueLight} />
                </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'row-reverse',
        width: "90%",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.whiteF7,
        elevation: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        height: 80
    },
    rowContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 40,
        elevation: 5,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
    },
    iconContainer: {
        backgroundColor: colors.white,
        height: 35,
        width: 35,
        elevation: 6,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        // flex: 1,
        fontFamily: "Tajawal-Bold",
        fontSize: 12,
        textAlignVertical: "center",
        color: colors.softBlack,
        textAlign: 'right',
    },
    address: {
        // flex: 1,
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        textAlignVertical: "center",
        color: colors.grey,
        textAlign: 'right',
    },
})