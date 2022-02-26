import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../config/vars';
import { elevations } from '../../config/elevations';


const { width, height } = Dimensions.get("window")

export default class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    deleteItem = () => {
        Alert.alert(
            'حذف المنتج',
            'هل انت متاكد بأنك تريد حذف هذا المنتج من السلة؟',
            [
                {
                    text: 'لا',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'نعم', onPress: () => this.props.deleteItem(this.props.item.item.order_id) },
            ],
            { cancelable: false },
        );
    }

    renderTextColor = (code) => {
        // show the status of an order with different color according to its progress
        let color = colors.mainColor
        switch (code) {
            case 1:
                color = colors.mainColor
                break;

            case 2:
                color = colors.success
                break;

            case 3:
                color = colors.success
                break;

            case 4:
                color = colors.ratingYellow
                break;

            case 5:
                color = colors.danger
                break;

            default:
                color = colors.mainColor
                break;
        }
        return color
    }

    render() {
        const item = this.props.item
        let color = this.renderTextColor(item.status.code)

        return (
            <Pressable onPress={() => this.props.onPress(item)} style={[styles.container, elevations[10]]}>
                <View style={[styles.imageContainer, elevations[5]]}>
                    <Image style={styles.image} source={{ uri: item.details[0].product.image }} />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.name}> {item.client.name} </Text>
                        <Text style={[styles.orderStatus, { color }]}> {item.status.text} </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.orderNumberText}>  {"رقم الطلب"} </Text>
                        <Text style={styles.orderNumberText}> {item.id}  </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.orderNumberText}>  {"عدد المنتجات"} </Text>
                        <Text style={styles.orderNumberText}> {item.details.length}  </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.orderNumberText}> {"الوقت"} {item.time}  </Text>
                        <Text style={[styles.orderNumberText, { fontFamily: fonts.tajawalB }]}> <Text style={styles.total}> {item.total} {"SR"} </Text> {""} </Text>
                    </View>
                </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        // height: 150,
        borderRadius: 15,
        backgroundColor: colors.white,
        flexDirection: "row-reverse",
        elevation: 10,
        padding: 20,
        paddingVertical: 30,
        alignItems: 'center'
    },
    imageContainer: {
        height: 90,
        width: 90,
        borderRadius: 20,
        backgroundColor: colors.mainColor,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
    infoContainer: {
        flex: 1,
        // backgroundColor: "#e3e3e3",
        marginRight: 10,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: "wrap"
    },
    name: {
        // backgroundColor: "red",
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        textAlign: "right",
        textAlignVertical: "center",
        color: colors.softBlack,
    },
    total: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        color: colors.softGreen,
    },
    orderNumberText: {
        fontFamily: fonts.tajawalR,
        fontSize: 13,
        color: colors.grey,
        // textAlign: 'center',
        // backgroundColor: 'red'
    },
    orderStatus: {
        fontFamily: fonts.tajawalB,
        fontSize: 12,
        color: colors.mainColor,
        textAlign: 'left'
    },
})