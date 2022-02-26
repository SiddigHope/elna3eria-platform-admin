import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../../config/vars';
import { getDeliveryBoys } from '../../config/apis/delivery/gets';
import DeliveryBoys from './deliveryBoys/DeliveryBoys';
import { assignDeliveryBoy } from '../../config/apis/orders/posts';
import elevations from '../../config/elevations';


export default class OrderFollowUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCode: this.props.order.status.code,
            showModal: false,
            boys: [],
            deliverySelected: 0,
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({
            boys: await getDeliveryBoys()
        })
    }

    changeStatusCode = async (code) => {
        this.setState({
            statusCode: code
        })
        this.props.changeStatus(code)
    }

    whatsapp = (phone) => {
        const link = "https://wa.me/" + phone
        Linking.canOpenURL(link)
            .then(supported => {
                if (!supported) {
                    Alert.alert(
                        'قم بتنزيل تطبيق الواتساب للمراسلة الفورية او بامكانك استحدام حاصية الاتصال المباشر'
                    );
                } else {
                    return Linking.openURL(link);
                }
            })
            .catch(err => console.error('An error occurred', err));

    }


    phoneCall = (phone) => {
        const link = "tel:" + phone
        Linking.openURL(link)
    }

    setColors = (code) => {
        let color = {}
        switch (code) {
            case 1:
                color = {
                    received: colors.softBlue,
                    prepare: colors.softWhite,
                    delivery: colors.softWhite,
                    done: colors.softWhite,
                    rejected: colors.softWhite
                }
                break;

            case 2:
                color = {
                    received: colors.softBlue,
                    prepare: colors.softBlue,
                    delivery: colors.softWhite,
                    done: colors.softWhite,
                    rejected: colors.softWhite
                }
                break;

            case 3:
                color = {
                    received: colors.softBlue,
                    prepare: colors.softBlue,
                    delivery: colors.softBlue,
                    done: colors.softWhite,
                    rejected: colors.softWhite
                }
                break;

            case 4:
                color = {
                    received: colors.softBlue,
                    prepare: colors.softBlue,
                    delivery: colors.softBlue,
                    done: colors.softBlue,
                    rejected: colors.softWhite
                }
                break;
            case 5:
                color = {
                    received: colors.danger,
                    prepare: colors.danger,
                    delivery: colors.danger,
                    done: colors.danger,
                    rejected: colors.danger
                }
                break;
            default:
                color = {
                    received: colors.softWhite,
                    prepare: colors.softWhite,
                    delivery: colors.softWhite,
                    done: colors.softWhite,
                    rejected: colors.softWhite
                }
                break;
        }
        return color
    }

    selectDelivery = async (id, index) => {
        console.log("inside function")
        const data = {
            delivery_boy_id: id
        }
        const assigned = await assignDeliveryBoy(this.props.order.id, data)
        if (assigned) {
            this.setState({
                deliverySelected: index,
                showModal: false
            })
            this.props.refresh()
        }
    }


    render() {
        let color = this.setColors(this.state.statusCode)
        // console.log(this.props.order)
        const delivery = this.props.order.delivery_boy

        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    onBackdropPress={() => this.setState({ showModal: false })}
                    onSwipeComplete={() => this.setState({ showModal: false })}
                    onRequestClose={() => this.setState({ showModal: false })}
                    visible={this.state.showModal}
                    animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={[styles.modal, elevations[10]]}>
                            {/* <Text>sdfdsfsd</Text> */}
                            <DeliveryBoys onPress={this.selectDelivery} selected={this.state.deliverySelected} boys={this.state.boys} />
                        </View>
                    </View>
                </Modal>
                <View style={styles.captainContainer}>
                    <TouchableOpacity onPress={() => this.setState({ showModal: true })} style={[styles.iconContainer, elevations[5], { marginLeft: 10 }]}>
                        {
                            delivery ? (
                                <Image style={{ width: 30, height: 30 }} source={require("../../../assets/icons/headset.png")} />
                            ) : (
                                <Icon name='account-plus-outline' size={25} color={colors.ebony} />
                            )
                        }
                    </TouchableOpacity>
                    {delivery ? (
                        <>
                            <View style={styles.textContainer}>
                                <Text style={styles.name}> {delivery.name} </Text>
                                <Text style={styles.phone}> {"رقم"} {delivery.phone} </Text>
                            </View>
                            <TouchableOpacity onPress={() => this.whatsapp(delivery.whatsapp)} style={[styles.iconContainer, elevations[5], { marginLeft: 10, marginRight: 5 }]}>
                                <Icon name="whatsapp" size={20} color={colors.softGreen} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.phoneCall(delivery.phone)} style={[styles.iconContainer, elevations[5]]}>
                                <Icon name="phone-in-talk" size={20} color={colors.softGreen} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.textContainer}>
                                {/* <Text style={styles.name}> {"محمد صديق"} </Text> */}
                                <Text style={styles.phone}> {"اضافة دلفري بوي"} </Text>
                            </View>
                        </>
                    )}
                </View>

                <View style={styles.followLines}>
                    <View style={[styles.line, { backgroundColor: color.received }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(1)} style={[styles.followIconContainer, elevations[5], { backgroundColor: color.received }]}>
                            {color.received == colors.softBlue && (
                                <Icon name="check-circle" size={20} color={colors.ebony} />
                            )}
                        </TouchableOpacity>
                        <Text style={[styles.name, { fontSize: 12, marginRight: 50, color: color.received == colors.softWhite ? colors.softWhite : colors.softBlack }]}> {"اضافة الطلب"} </Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: color.prepare }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(2)} style={[styles.followIconContainer, elevations[5], { backgroundColor: color.prepare }]}>
                            {color.prepare == colors.softBlue && (
                                <Icon name="check-circle" size={20} color={colors.ebony} />
                            )}
                        </TouchableOpacity>
                        <Text style={[styles.name, { fontSize: 12, marginRight: 50, color: color.prepare == colors.softWhite ? colors.softWhite : colors.softBlack }]}> {"يتم التحضير"} </Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: color.delivery }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(3)} style={[styles.followIconContainer, elevations[5], { backgroundColor: color.delivery }]}>
                            {color.delivery == colors.softBlue && (
                                <Icon name="check-circle" size={20} color={colors.ebony} />
                            )}
                        </TouchableOpacity>
                        <Text style={[styles.name, { fontSize: 12, marginRight: 50, color: color.delivery == colors.softWhite ? colors.softWhite : colors.softBlack }]}> {"في طريق التوصيل"} </Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: color.done }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(4)} style={[styles.followIconContainer, elevations[5], { backgroundColor: color.done }]}>
                            {color.done == colors.softBlue && (
                                <Icon name="check-circle" size={20} color={colors.ebony} />
                            )}
                        </TouchableOpacity>
                        <Text style={[styles.name, { fontSize: 12, marginRight: 50, color: color.done == colors.softWhite ? colors.softWhite : colors.softBlack }]}> {"تم التسليم"} </Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: color.rejected }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(5)} style={[styles.followIconContainer, elevations[5], { backgroundColor: color.rejected }]}>
                            {color.rejected == colors.softBlue && (
                                <Icon name="check-circle" size={20} color={colors.ebony} />
                            )}
                        </TouchableOpacity>
                        <Text style={[styles.name, { fontSize: 12, marginRight: 50, color: color.rejected == colors.softWhite ? colors.softWhite : colors.softBlack }]}> {"ملغي"} </Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    captainContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: colors.softBlue,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    iconContainer: {
        backgroundColor: colors.white,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50
    },
    followIconContainer: {
        backgroundColor: colors.softBlue,
        elevation: 5,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 5,
        marginRight: "-5%",
        borderRadius: 50
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        color: colors.softBlack,
        textAlign: 'right'
    },
    phone: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.white,
        textAlign: 'right'
    },
    followLines: {
        // backgroundColor: "#e3e3e3",
        alignItems: "flex-end",
        marginRight: "20%",
        marginBottom: 30
    },
    line: {
        width: 1,
        height: 50,
        backgroundColor: colors.softBlue
    },
    rowContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.blackTransparent,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    modal: {
        backgroundColor: colors.white,
        // height: '50%',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingTop: 20,
        elevation: 10,
        maxHeight: "70%",
    },
})