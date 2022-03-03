import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { colors } from '../../config/vars';
import UserClass from '../../config/authHandler';
import ProfileHeader from './ProfileHeader';
import ListComponent from './ListComponent';
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/SimpleLineIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import elevations from '../../config/elevations';


const { width, height } = Dimensions.get("window")

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            updated: false
        };
        this.list = [
            {
                id: 1,
                title: "المفضلة",
                onPress: "",
                icon: <Icon1 name="heart-outline" size={25} color={colors.mainColor} />,
            },
            {
                id: 2,
                title: "طلباتي",
                onPress: "",
                icon: <Icon3 name="handbag" size={25} color={colors.mainColor} />,
            },
            {
                id: 3,
                title: "تقيماتي",
                onPress: "",
                icon: <Icon name="star-face" size={25} color={colors.mainColor} />,
            },
            {
                id: 4,
                title: "تعليقاتي",
                onPress: "",
                icon: <Icon2 name="comment" size={25} color={colors.mainColor} />,
            },
        ]
    }

    componentDidMount() {
        this.getUser()
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

    _itemSeparator = () => (
        <View style={[styles.hr, elevations[1]]} />
    )

    _listHeader = () => (
        <View style={{ height: 20 }} />
    )

    _listFooter = () => (
        <View style={{ height: 20 }} />
    )

    _renderItem = (item, index) => (
        <ListComponent item={item} index={index} />
    )

    render() {
        // console.log("this.state.user")
        // console.log(this.state.user)
        return (
            <View style={styles.container}>
                {this.state.updated ? (
                    <>
                        <ProfileHeader user={this.state.user} navigation={this.props.navigation} />
                        <View style={[styles.listContainer, elevations[10]]} >
                            {/* {this.list.map(item => (
                        <ListComponent item={item} key={item.id} />
                    ))} */}
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
                        </View>
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
        backgroundColor: "#DFEAED",
        elevation: 1,
        marginVertical: 10
    },
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 30,
        // justifyContent:  'center',
        width: "90%",
        // marginBottom: 55
        // backgroundColor: colors.white
    },
    listContainer: {
        paddingVertical: 30,
        borderRadius: 20,
        backgroundColor: colors.white,
        elevation: 10,
        marginVertical: 20,
        width: "100%"
    }
})