import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../config/vars';
import UserClass from '../../config/authHandler';
import ProfileHeader from './ProfileHeader';
import ListComponent from './ListComponent';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/SimpleLineIcons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/AntDesign";
import elevations from '../../config/elevations';
import { goToScreen } from '../../config/functions';


const { width, height } = Dimensions.get("window")

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            updated: false
        };
        this.list = [
            // {
            //     id: 1,
            //     title: "اعلانات",
            //     onPress: "",
            //     icon: <Icon name="image-filter-center-focus-weak" size={25} color={colors.mainColor} />,
            // },
            {
                id: 2,
                title: "الموظفين",
                onPress: "Delivery",
                icon: <Icon name="account-group-outline" size={25} color={colors.mainColor} />,
            },
            // {
            //     id: 3,
            //     title: "التقيمات",
            //     onPress: "",
            //     icon: <Icon name="star-face" size={25} color={colors.mainColor} />,
            // },
            // {
            //     id: 4,
            //     title: "التعليقات",
            //     onPress: "",
            //     icon: <Icon2 name="comment" size={25} color={colors.mainColor} />,
            // },
            {
                id: 5,
                title: "المحادثات",
                onPress: "Chats",
                icon: <Icon2 name="comment" size={25} color={colors.mainColor} />,
            },
        ]
        this.footerList = [
            {
                id: 1,
                title: "عن التطبيق",
                onPress: "About",
                icon: <Icon1 name="ios-information-circle-sharp" size={25} color={colors.mainColor} />,
            },
            {
                id: 2,
                title: "الدعم الفني",
                onPress: "Support",
                icon: <Icon4 name="contact-support" size={25} color={colors.mainColor} />,
            },
            {
                id: 3,
                title: "الشروط و الأحكام",
                onPress: "Policy",
                icon: <Icon4 name="policy" size={25} color={colors.mainColor} />,
            },
            {
                id: 4,
                title: "تسجيل خروج",
                onPress: "Signin",
                icon: <Icon4 name="logout" size={25} color={colors.mainColor} />,
            },
        ]
        this.navigation = this.props.navigation
    }

    componentDidMount() {
        this.setState({
            updated: true
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user,
        })
    }

    getUser = async () => {
        this.setState({
            user: await UserClass.getUser()
        })
        setTimeout(() => {
            this.setState({
                updated: true
            })
        }, 2000)
    }

    goToScreen = (item) => {
        if (item == "Signin") {
            UserClass.logout()
            goToScreen(item, this.props.navigation)
            return
        }

        if (item == "Support") {
            // goToScreen(item, this.props.navigation)
            return
        }

        if (item == "About") {
            goToScreen(item, this.props.navigation, { type: "about" })
            return
        }

        if (item == "Policy") {
            goToScreen("About", this.props.navigation, { type: "policy" })
            return
        }
        goToScreen(item, this.props.navigation)
    }

    openChat = () => {
        const receiver = {
            id: 1,
            name: "الدعم الفني",
            image: 'https://thumbs.dreamstime.com/b/technical-support-29097029.jpg'
        }
        goToScreen("Chat", this.props.navigation, { receiver, type: "support" })
    }

    _itemSeparator = () => (
        <View style={[styles.hr, elevations[1]]} />
    )

    _listHeader = () => (
        <View style={{ height: 20 }} />
    )

    _listFooter = () => (
        <View style={styles.footerContainer}>
            <TouchableOpacity onPress={this.openChat} style={styles.footerItemContainer}>
                {this.footerList[1].icon}
                <Text style={styles.title}> {this.footerList[1].title} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goToScreen(this.footerList[0].onPress)} style={styles.footerItemContainer}>
                {this.footerList[0].icon}
                <Text style={styles.title}> {this.footerList[0].title} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goToScreen(this.footerList[2].onPress)} style={styles.footerItemContainer}>
                {this.footerList[2].icon}
                <Text style={styles.title}> {this.footerList[2].title} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goToScreen(this.footerList[3].onPress)} style={styles.footerItemContainer}>
                {this.footerList[3].icon}
                <Text style={styles.title}> {this.footerList[3].title} </Text>
            </TouchableOpacity>
        </View>
    )

    _renderItem = (item, index) => (
        <ListComponent
            item={item.item}
            index={index}
            navigation={this.props.navigation}
        />
    )

    render() {
        // console.log("this.state.user")
        // console.log(this.state.user)
        return (
            <View style={styles.container}>
                {this.state.updated ? (
                    <>
                        <ProfileHeader user={this.state.user} navigation={this.props.navigation} />
                        <FlatList
                            data={this.list}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            // ListHeaderComponent={this._listHeader}
                            style={{ width: "90%" }}
                            contentContainerStyle={{ alignItems: 'center' }}
                            ListFooterComponent={this._listFooter}
                            ItemSeparatorComponent={this._itemSeparator}
                            renderItem={this._renderItem}
                        />
                    </>
                ) : (
                    <View style={[{ flex: 1, justifyContent: 'center' }]}>
                        <ActivityIndicator color={colors.mainColor} size={50} />
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    hr: {
        height: 0.5,
        width: 170,
        alignSelf: 'center',
        backgroundColor: colors.grey,
        elevation: 1,
        marginVertical: 5,
    },
    container: {
        flex: 1,
        alignItems: "center",
        width: "90%",
    },
    listContainer: {
        paddingVertical: 30,
        borderRadius: 20,
        backgroundColor: colors.white,
        elevation: 10,
        marginVertical: 20,
        width: "100%"
    },
    footerContainer: {
        paddingTop: 30,
        borderRadius: 20,
        // backgroundColor: colors.black,
        marginTop: 40,
        marginBottom: 20,
        width: "100%",
        borderTopColor: colors.white,
        borderTopWidth: 0.5
    },
    footerItemContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: "100%",
        height: 60,
        elevation: 5,
    },
    title: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: "center",
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.white,
        marginHorizontal: 20
    }
})