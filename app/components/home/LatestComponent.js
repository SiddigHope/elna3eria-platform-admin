import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../config/vars';
import { elevations } from '../../config/elevations';
import { cacheImage } from "../../config/functions";

const { width, height } = Dimensions.get("window")

export default class LatestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: { uri: this.props.item.details[0].product.image }
        };
    }

    componentDidMount() {
        this._loadImage()
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        this._loadImage({ uri: nextProps.item.details[0].product.image })
    }

    _loadImage = async (uri) => {
        let image = await cacheImage({ uri: this.props.item.details[0].product.image })
        if (uri) {
            image = await cacheImage(uri)
        }
        this.setState({ image, })
        // return image
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
                    <Image style={styles.image} source={this.state.image} />
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
        borderRadius: 10,
        backgroundColor: colors.white,
        flexDirection: "row-reverse",
        elevation: 10,
        padding: 20,
        paddingVertical: 10,
        alignItems: 'center'
    },
    imageContainer: {
        height: 70,
        width: 70,
        borderRadius: 10,
        backgroundColor: colors.mainColor,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
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