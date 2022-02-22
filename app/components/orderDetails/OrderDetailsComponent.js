import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../config/vars';
import OrderFollowUp from './OrderFollowUp';

export const Hr = ({ props }) => (
    <View style={[styles.hr, props]} />
)

export default class OrderDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.storeInfo}>
                    {/* <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: this.props.order.details[0].product.image }} />
                    </View>
                    <Text style={styles.storeName}> {this.props.order.client.name} </Text>
                    <Hr props={{ top: -20, width: 100 }} /> */}

                    <Text style={styles.label}> {"رقم الطلب"} </Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.orderId}> {this.props.order.id} </Text>
                        <Text style={styles.orderId}> {this.props.order.time} {"الوقت"} </Text>
                    </View>

                    <Hr props={{ marginTop: 5, marginBottom: 30 }} />

                    <Text style={styles.label}> {"موقع التسليم"} </Text>
                    <View style={styles.rowContainer}>
                        <View>
                            {/* <Text style={styles.address}> {"امدرمان - امبدة حارة  14"} </Text> */}
                            <Text style={styles.orderId}> {this.props.order.address} </Text>
                        </View>
                        <View style={styles.iconContainer} >
                            <Icon name="map-marker-radius" color={colors.blueLight} size={20} />
                        </View>
                    </View>

                    <Hr props={{ marginTop: 5, marginBottom: 30 }} />

                    <Text style={styles.label}> {"طريقة الدفع"} </Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.orderId, { fontSize: 14, textAlign: 'center', textAlignVertical: 'center' }]}> {"***** **** ****"} {"9232"} </Text>
                        <View style={styles.iconContainer} >
                            <Image source={require("../../../assets/icons/paypal.png")} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>

                    {this.props.order.details.map(product => (
                        <>
                            <Text style={styles.label}> {product.product.name} </Text>
                            <View style={[styles.rowContainer, { justifyContent: "flex-start" }]}>
                                <View style={styles.productContainer}>
                                    <Text style={[styles.orderId, { flex: 1, fontSize: 14, textAlignVertical: 'center' }]}> {"الكمية :"} {product.quantity} </Text>
                                    <Text style={[styles.orderId, { flex: 1, fontSize: 14, textAlignVertical: 'center', color: colors.ebony }]}> {"تعليق على طلب المنتج"} </Text>
                                </View>
                                <View style={styles.productImageContainer} >
                                    <Image source={{ uri: product.product.image }} style={styles.productImage} />
                                </View>
                            </View>
                        </>
                    ))}

                    <Hr props={{ marginTop: 5, marginBottom: 30 }} />

                    <OrderFollowUp changeStatus={this.props.changeStatus} order={this.props.order} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    hr: {
        height: 0.5,
        width: "100%",
        backgroundColor: "#DFEAED",
        elevation: 1
    },
    container: {
        flex: 1,
        // marginTop: 15,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
    },
    storeInfo: {
        alignItems: 'center',
        flex: 1
    },
    imageContainer: {
        // position: "absolute",
        top: -30,
        // alignSelf: 'center',
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: colors.softWhite,
        elevation: 5,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 60
    },
    storeName: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.softBlack,
        top: -20
    },
    label: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        alignSelf: "flex-end",
        color: colors.softBlack,
        marginBottom: 5,
        marginTop: 30,
    },
    rowContainer: {
        width: '100%',
        // backgroundColor: 'red',
        flexDirection: "row-reverse",
        justifyContent: "space-between"
    },
    orderId: {
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        color: colors.grey,
        marginBottom: 5
    },
    address: {
        fontFamily: fonts.tajawalB,
        fontSize: 12,
        color: colors.grey,
        marginBottom: 5
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 5,
        backgroundColor: colors.softWhite,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productImageContainer: {
        height: 80,
        width: 80,
        borderRadius: 10,
        backgroundColor: colors.mainColor,
        elevation: 5
    },
    productImage: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
    productContainer: {
        flex: 1,
        // backgroundColor: "#e3e3e3",
        marginLeft: 10
    }
})

