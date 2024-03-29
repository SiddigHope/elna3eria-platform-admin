import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Pressable,
    TouchableOpacity,
    Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, fonts } from '../../../config/vars';
import { goToScreen } from '../../../config/functions';
import { deleteProduct } from "../../../config/apis/products/posts";


const { width, height } = Dimensions.get("window");

export default class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    deleteItem = async (item) => {

        Alert.alert(
            'حذف المنتج',
            'هل انت متاكد بنأنك تريد حذف هذا المنتج؟',
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

    deleteItemConfirm(id) {
        const deleted = deleteProduct(id)
        if (deleted) {
            this.props.updateData()
            return
        }
        console.log("item not deleted")
    }

    render() {
        let margin = 0;
        if (this.props.item.index % 2 == 0) {
            margin = 10;
        }

        const item = this.props.item.item;
        return (
            <View
                style={[styles.container, { marginRight: margin }]}
            >
                <TouchableOpacity onPress={() => this.deleteItem(item)} style={styles.deleteIcon} >
                    <View>
                        <Icon name="trash-can-outline" size={20} color={colors.danger} />
                    </View>
                </TouchableOpacity>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Pressable onPress={() => this.props._productScreen("edit", { item: item })} style={styles.contentContainer}>
                    <View style={styles.nameContainer}>
                        <View style={styles.miniRow}>
                            <Text
                                numberOfLines={1}
                                style={[styles.price, { maxWidth: 35 }]}
                            >
                                {item.price}
                            </Text>
                            <Text style={[styles.price]}>{" SR"}</Text>
                        </View>
                        <Text style={styles.title} numberOfLines={1}>
                            {" "}
                            {item.name}{" "}
                        </Text>
                    </View>
                    <View style={[styles.nameContainer, { marginHorizontal: 10, marginTop: 0 }]}>
                        <Text numberOfLines={3} style={styles.desc}>
                            {item.description}
                        </Text>
                    </View>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: (width - 40) / 2,
        height: 220,
        backgroundColor: colors.white,
        borderRadius: 20,
        elevation: 5,
    },
    image: {
        width: (width - 40) / 2,
        height: 180,
        borderRadius: 20,
    },
    contentContainer: {
        position: "absolute",
        backgroundColor: colors.white,
        height: "35%",
        width: "100%",
        bottom: 0,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 5,
    },
    miniRow: {
        flexDirection: "row",
        // backgroundColor: 'red',
        alignItems: "center",
    },
    title: {
        flex: 1,
        fontFamily: "Tajawal-Bold",
        fontSize: 12,
        color: colors.softBlack,
        // backgroundColor: 'red',
        textAlign: 'right',
    },
    price: {
        fontFamily: "Tajawal-Bold",
        fontSize: 14,
        color: colors.softGreen,
        margin: 0,
    },
    desc: {
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        textAlign: 'right',
        width: "100%"
    },
    deleteIcon: {
        position: "absolute",
        backgroundColor: colors.white,
        height: 30,
        width: 30,
        elevation: 6,
        borderRadius: 15,
        left: 10,
        top: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 11
    }
});
