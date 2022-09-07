import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../config/vars';
import OrderFollowUp from './OrderFollowUp';
import { elevations } from '../../config/elevations';
import Maps from '../../screens/Maps';
import UserClass from '../../config/authHandler';

export const Hr = ({ props }) => (
    <View style={[styles.hr, props, elevations[1]]} />
)


const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const PAYMENT = {
    CASH: {
        label: "الدفع كاش عند الاستلام",
        value: "CASH",
        image: require("../../../assets/icons/cash-payment.png"),
    },
    ONLINE: {
        label: "**** **** **** 1234",
        value: "ONLINE",
        image: require("../../../assets/icons/pngegg.png"),
    },
};

export default class OrderDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeLocation: {},
            clientLocation: {
                latitude: this.props.order.lat,
                longitude: this.props.order.long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            store: false,
            updated: false
        };
    }

    componentDidMount() {
        this.getStoreLocation()
    }

    getStoreLocation = async () => {
        const { order } = this.props
        const store = await UserClass.getUser()
        // console.log("store");
        // console.log(store);
        this.setState({
            store: store.employee.store,
            storeLocation: {
                latitude: store.employee.store.lat,
                longitude: store.employee.store.long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
        })

        if (!order.pickup) {
            this.setState({
                clientLocation: {
                    latitude: order.lat,
                    longitude: order.long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                },
                updated: true
            })
        }
    }

    render() {
        const payment = PAYMENT[this.props.order.payment_method]
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

                    <Text style={styles.label}> {"طريقة الدفع"} </Text>
                    <View style={styles.rowContainer}>
                        {/* <Text style={[styles.orderId, { fontSize: 14, textAlign: 'center', textAlignVertical: 'center' }]}> {"***** **** ****"} {"9232"} </Text>
                        <View style={styles.iconContainer} >
                            <Image source={require("../../../assets/icons/paypal.png")} style={{ width: 20, height: 20 }} />
                        </View> */}
                        <View style={[styles.paymentContainer, elevations[5]]}>
                            <Image source={payment.image} style={styles.paymentImage} />
                            <Text style={styles.paymentText}> {payment.label} </Text>
                        </View>
                    </View>

                    <Hr props={{ marginTop: 5, marginBottom: 10 }} />

                    {this.props.order.details.map(product => (
                        <>
                            <Text style={styles.label}> {product.product.name} </Text>
                            <View style={[styles.rowContainer, { justifyContent: "flex-start" }]}>
                                <View style={styles.productContainer}>
                                    <Text style={[styles.orderId, { flex: 1, fontSize: 14, textAlignVertical: 'center' }]}> {"الكمية :"} {product.quantity} </Text>
                                    <Text style={[styles.orderId, { flex: 1, fontSize: 14, textAlignVertical: 'center', color: colors.ebony }]}> {product.comment} </Text>
                                </View>
                                <View style={[styles.productImageContainer, elevations[5]]} >
                                    <Image source={{ uri: product.product.image }} style={styles.productImage} />
                                </View>
                            </View>
                        </>
                    ))}

                    <Hr props={{ marginTop: 5, marginBottom: 30 }} />
                    <Text style={styles.label}> {"موقع التسليم"} </Text>
                    <View style={styles.rowContainer}>
                        <View>
                            {/* <Text style={styles.address}> {"امدرمان - امبدة حارة  14"} </Text> */}
                            {!this.props.order.pickup && this.state.updated ? (
                                <View style={styles.mapContainer}>
                                    <Maps
                                        navigation={this.props.navigation}
                                        location={this.state.storeLocation}
                                        clientLocation={this.state.clientLocation}
                                        editLocation={false}
                                        screen={"order"}
                                        store={this.state.store}
                                        client={this.props.order.client}
                                        showUserLocation={false}
                                        setEditLocation={() => this.setState({ editLocation: true })}
                                        setLocation={(location) => this.setState({ location })}
                                        closeModal={() => this.setState({ showMap: false })}
                                    />
                                </View>
                            ) : (
                                <Text style={styles.orderId}> {"استلام من الموقع"} </Text>
                            )}
                        </View>
                        {/* <View style={styles.iconContainer} >
                            <Icon name="map-marker-radius" color={colors.blueLight} size={20} />
                        </View> */}
                    </View>

                    <Hr props={{ marginTop: 5, marginBottom: 30 }} />


                    <OrderFollowUp refresh={this.props.refresh} changeStatus={this.props.changeStatus} order={this.props.order} />
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
    mapContainer: {
        width: width - 40,
        height: (height * 70) / 100,
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
    paymentText: {
        flex: 1,
        marginHorizontal: 10,
        textAlign: 'right',
        fontFamily: fonts.tajawalB,
        fontSize: 14,
    },
    paymentImage: {
        height: 40,
        width: 40
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
        marginBottom: 5,
        textAlign: "right"
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
    },
    paymentContainer: {
        width: "100%",
        // height: 70,
        // backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingHorizontal: 20,
        // borderRadius: 10,
        // elevation: 5,
        // marginVertical: 10
    },
})

