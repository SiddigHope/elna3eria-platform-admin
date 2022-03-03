import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../config/vars';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { ActivityIndicator } from 'react-native';
import elevations from '../../config/elevations';
import { goToScreen } from '../../config/functions';


export default class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };
    }

    editProfile = () => {
        goToScreen("EditProfile", this.props.navigation, { user: this.props.user.client })
    }

    render() {
        const user = this.state.user.employee
        // console.log("user")
        // console.log(user.store)
        // if (user) {
        //     return (
        //         <ActivityIndicator size={72} color={colors.mainColor} />
        //     )
        // }
        return (
            <View style={[styles.container, elevations[5]]}>
                <View style={[styles.imageContainer, elevations[5]]}>
                    <Image style={styles.image} source={user.store ? { uri: user.store.image } : require("../../../assets/images/avatar.png")} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>
                        {user.store.name}
                    </Text>
                    <Text style={styles.email}>
                        {user.name}
                    </Text>
                </View>
                <TouchableOpacity onPress={this.editProfile} style={[styles.logoutBtn, elevations[5]]} >
                    <Icon name="account-cog-outline" size={30} color={colors.ebony} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.white,
        elevation: 5,
        borderRadius: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    imageContainer: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: colors.whiteF7,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 40,
    },
    infoContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    name: {
        flex: 1,
        textAlign: "right",
        textAlignVertical: 'center',
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.ebony,
    },
    email: {
        flex: 1,
        textAlign: "right",
        textAlignVertical: 'top',
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        color: colors.grey,
    },
    logoutBtn: {
        // position: "absolute",
        backgroundColor: colors.whiteF7,
        borderRadius: 30,
        padding: 5,
        elevation: 5,
        // left: -5,
        // top: -10
    }
})