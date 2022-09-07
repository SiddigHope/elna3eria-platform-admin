import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Pressable,
    TouchableOpacity,
    Alert,
    Linking
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, fonts } from '../../config/vars';
import { goToScreen } from '../../config/functions';
import { deleteDeliveryBoy } from "../../config/apis/delivery/posts";
import { elevations } from '../../config/elevations';

const { width, height } = Dimensions.get("window");

export default class DeliveryBoysComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
        };
    }

    deleteItem = async (item) => {

        Alert.alert(
            'تأكيد الحذف',
            'هل انت متاكد ',
            [
                {
                    text: 'لا',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'نعم', onPress: () => this.deleteItemConfirm(item.id) },
            ],
            { cancelable: false },
        );
    }

    async deleteItemConfirm(id) {
        const deleted = await deleteDeliveryBoy(id)
        if (deleted) {
            this.props.updateData()
            return
        }
        console.log("item not deleted")
    }

    whatsapp = (phone) => {
        // if (phone.contains("+")) {
        //     let phone = phone.replace("+", "")
        // }
        // console.log(phone)

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
        if (phone.includes("+")) {
            let phone = phone.replace("+", "")
        }
        // console.log(phone)
        const link = "tel:" + phone
        Linking.openURL(link)
    }


    render() {
        const item = this.props.item.item;
        const iconsSize = 20
        return (
            <View
                style={[styles.container, elevations[5]]}
            >
                {/* <TouchableOpacity onPress={() => this.deleteItem(item)} style={styles.deleteIcon} >
                    <Icon name="trash-can-outline" size={20} color={colors.danger} />
                </TouchableOpacity> */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}> {item.name} </Text>
                    <Text style={styles.desc}> {"امدرمان  امبدة المنصورة"} </Text>
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity onPress={() => this.deleteItem(item)} style={[styles.icon, elevations[6]]}>
                            <Icon name="trash-can-outline" size={iconsSize} color={colors.danger} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.whatsapp(item.whatsapp)} style={[styles.icon, elevations[6]]}>
                            <Icon name="whatsapp" size={iconsSize} color={colors.success} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.phoneCall(item.phone)} style={[styles.icon, elevations[6]]}>
                            <Icon name="phone-in-talk" size={iconsSize} color={colors.blueLight} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props._boysScreen("edit", { item: item })} style={[styles.icon, elevations[6]]}>
                            <Icon name="account-edit-outline" size={iconsSize} color={colors.ratingYellow} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Image source={{ uri: item.image }} style={styles.image} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 120,
        backgroundColor: colors.whiteF7,
        borderRadius: 10,
        elevation: 5,
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        padding: 15
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    contentContainer: {
        flex: 1,
        marginRight: 10
        // backgroundColor: 'red',
    },
    title: {
        flex: 1,
        fontFamily: "Tajawal-Bold",
        fontSize: 12,
        textAlignVertical: "center",
        color: colors.softBlack,
        textAlign: 'right',
    },
    desc: {
        flex: 1,
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        textAlignVertical: "center",
        color: colors.grey,
        textAlign: 'right',
    },
    icon: {
        // position: "absolute",
        backgroundColor: colors.white,
        height: 35,
        width: 35,
        elevation: 6,
        borderRadius: 20,
        // left: 10,
        // top: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 11,
    },
    btnsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
