import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../config/vars';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon1 from "react-native-vector-icons/Ionicons"
import { ActivityIndicator } from 'react-native';
import elevations from '../../config/elevations';
import { goToScreen } from '../../config/functions';

const { width } = Dimensions.get("window")
export default class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    componentWillReceiveProps(nextProps) {
        // if (this.state.user != nextProps.user) {
        this.setState({
            user: nextProps.user
        })
        // }
    }

    editProfile = () => {
        goToScreen("EditProfile", this.props.navigation, { user: this.props.user.employee })
    }

    render() {
        const user = this.state.user.employee
        // console.log("user")
        // console.log(user)
        if (!user) {
            return (
                <ActivityIndicator size={72} color={colors.mainColor} />
            )
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()} style={styles.closeDrawer}>
                    <Icon1 name='arrow-forward' size={20} color={colors.white} />
                </TouchableOpacity>
                <View style={[styles.imageBannerContainer, elevations[5]]}>
                    <Image
                        style={styles.imageBanner}
                        source={require("../../../assets/images/5804273.jpg")}
                    />
                </View>
                <View style={[styles.profileContainer]}>
                    <View style={[styles.imageContainer, elevations[5]]}>
                        <Image style={styles.image} source={user.store ? { uri: user.store.image } : require("../../../assets/images/avatar.png")} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.name}>
                                {user.store.name}
                            </Text>
                        </View>
                        <Text style={styles.email}>
                            {user.name}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={this.editProfile} style={[styles.logoutBtn, elevations[5]]} >
                        <Icon name="account-cog-outline" size={30} color={colors.ebony} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: (width * 90) / 100,
        height: 250,
        backgroundColor: colors.whiteF7,
        elevation: 5,
        // borderRadius: 10,
        alignItems: 'center',
        // padding: 10,
        marginBottom: 20
    },
    closeDrawer: {
        width: 25,
        height: 25,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ebony,
        position: "absolute",
        zIndex: 111,
        elevation: 10,
        left: 10,
        top: 10
    },
    imageBannerContainer: {
        height: 150,
        width: (width * 90) / 100,
        // borderRadius: 10,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        backgroundColor: colors.whiteF7,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBanner: {
        height: "100%",
        width: "100%",
        // borderRadius: 10,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
    },
    profileContainer: {
        width: (width * 90) / 100,

        backgroundColor: colors.whiteF7,
        elevation: 5,
        // borderRadius: 10,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20
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
        // flex: 1,
        textAlign: "right",
        textAlignVertical: 'center',
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.ebony,
        // backgroundColor: "red"
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