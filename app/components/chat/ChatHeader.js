import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../../config/vars';

const { width, height } = Dimensions.get("window")

export default class ChatHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {client} = this.props
        return (
            <View style={[styles.container, Platform.OS === "ios" && { paddingTop: 20, height: 100 }]}>
                <View style={styles.avatarContainer}>
                    {/* <Image source={require("../../../assets/images/avatar.png")} style={styles.avatar} /> */}
                    <Image source={{uri: client.image}} style={styles.avatar} />
                </View>
                {/* <Text style={styles.username}>{"Siddig A.Hamoda"}</Text> */}
                <Text style={styles.username}>{client.name}</Text>
                <Icon onPress={() => this.props.navigation.goBack()} name="md-chevron-back-outline" size={25} color={colors.ebony} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: width,
        height: 70,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        flexDirection: "row-reverse",
        paddingHorizontal: 20,
        borderColor: colors.borderColor,
        justifyContent: "space-between",
        backgroundColor: colors.whiteF7,
        elevation: 3,
    },
    username: {
        fontFamily: fonts.tajawalB,
        color: colors.ebony,
        // backgroundColor: colors.blueLight,
        flex: 1,
        fontSize: 16,
        marginHorizontal: 10,
        textAlign: 'right'
    },
    avatarContainer: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: colors.mainColor,
        elevation: 10,
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 30
    },
})