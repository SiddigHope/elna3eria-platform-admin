import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../../config/vars';


export default class OrderFollowUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCode: this.props.order.status.code
        };
    }

    changeStatusCode = async (code) => {
        this.setState({
            statusCode: code
        })
        this.props.changeStatus(code)
    }

    whatsapp = () => {
        const link = "https://wa.me/24912 473 8344"
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


    phoneCall = () => {
        const link = "tel:012 473 8344"
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

    render() {
        let color = this.setColors(this.state.statusCode)
        return (
            <View style={styles.container}>
                <View style={styles.captainContainer}>
                    <View style={[styles.iconContainer, { marginLeft: 10 }]}>
                        <Image style={{ width: 30, height: 30 }} source={require("../../../assets/icons/headset.png")} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}> {"محمد صديق"} </Text>
                        <Text style={styles.phone}> {"رقم"} {"012 473 8344"} </Text>
                    </View>
                    <TouchableOpacity onPress={this.whatsapp} style={[styles.iconContainer, { marginLeft: 10, marginRight: 5 }]}>
                        <Icon2 name="chatbox-ellipses" size={20} color={colors.softGreen} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.phoneCall} style={styles.iconContainer}>
                        <Icon name="phone-in-talk" size={20} color={colors.softGreen} />
                    </TouchableOpacity>
                </View>

                <View style={styles.followLines}>
                    <View style={[styles.line, { backgroundColor: color.received }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(1)} style={[styles.followIconContainer, { backgroundColor: color.received }]}>
                            {color.received == colors.softBlue && (
                                <Icon name="check-circle" size={20} color={colors.ebony} />
                            )}
                        </TouchableOpacity>
                        <Text style={[styles.name, { fontSize: 12, marginRight: 50, color: color.received == colors.softWhite ? colors.softWhite : colors.softBlack }]}> {"اضافة الطلب"} </Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: color.prepare }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(2)} style={[styles.followIconContainer, { backgroundColor: color.prepare }]}>
                            {color.prepare == colors.softBlue && (
                                <Icon name="check-circle" size={20} color={colors.ebony} />
                            )}
                        </TouchableOpacity>
                        <Text style={[styles.name, { fontSize: 12, marginRight: 50, color: color.prepare == colors.softWhite ? colors.softWhite : colors.softBlack }]}> {"يتم التحضير"} </Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: color.delivery }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(3)} style={[styles.followIconContainer, { backgroundColor: color.delivery }]}>
                            {color.delivery == colors.softBlue && (
                                <Icon name="check-circle" size={20} color={colors.ebony} />
                            )}
                        </TouchableOpacity>
                        <Text style={[styles.name, { fontSize: 12, marginRight: 50, color: color.delivery == colors.softWhite ? colors.softWhite : colors.softBlack }]}> {"في طريق التوصيل"} </Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: color.done }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(4)} style={[styles.followIconContainer, { backgroundColor: color.done }]}>
                            {color.done == colors.softBlue && (
                                <Icon name="check-circle" size={20} color={colors.ebony} />
                            )}
                        </TouchableOpacity>
                        <Text style={[styles.name, { fontSize: 12, marginRight: 50, color: color.done == colors.softWhite ? colors.softWhite : colors.softBlack }]}> {"تم التسليم"} </Text>
                    </View>
                    <View style={[styles.line, { backgroundColor: color.rejected }]} />
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.changeStatusCode(5)} style={[styles.followIconContainer, { backgroundColor: color.rejected }]}>
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
    }
})