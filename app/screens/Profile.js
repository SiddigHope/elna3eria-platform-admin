import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, BackHandler } from "react-native";
import MiniHeader from "../components/MiniHeader";
import ProfileComponent from "../components/profile/ProfileComponent";
import Header from "../config/header/Header";
import { colors } from '../config/vars';
import GestureRecognizer from "react-native-swipe-gestures";
import UserClass from '../config/authHandler';
import { useDrawerStatus } from '@react-navigation/drawer';

export default function Profile(props) {

    const [user, setUser] = useState([])

    const isDrawerOpen = useDrawerStatus() === 'open';

    console.log("id drawer open? " + isDrawerOpen)

    useEffect(() => {
        getUser()
    }, [isDrawerOpen])

    const getUser = async () => {
        const user = await UserClass.getUser()
        // console.log("user setTimeOut")
        // console.log(user)

        if (user == []) {
            console.log("the user array is empty")
            setUser(false)
        } else {
            setUser(user)
        }
    }


    return (
        <GestureRecognizer
            onSwipeRight={() => props.navigation.closeDrawer()}
            style={styles.container}
        >
            {/* <View > */}
            <StatusBar backgroundColor={colors.whiteF7} translucent={false} />

            <ProfileComponent user={user} navigation={props.navigation} />
            {/* </View> */}
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.ebony
    },
})