import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { colors, fonts, mainColorWithOpacity } from '../../config/vars';
import { goToScreen } from '../../config/functions';


const { width, height } = Dimensions.get("window")

export default class ChatsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goToChat = () => {
        goToScreen("Chat", this.props.navigation, { conversation: this.props.item })
    }

    render() {
        const { item } = this.props
        console.log("item.to be printted")
        // console.log(item.last_message)
        return (
            <TouchableHighlight underlayColor={mainColorWithOpacity(0.4)} onPress={this.goToChat} style={styles.container}>
                <>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: item.client.image }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}> {item.client.name} </Text>
                        <Text numberOfLines={1} style={styles.message}> {item.last_message.length && item.last_message[0].message_type} </Text>
                    </View>
                    <Text style={styles.time}> {item.last_message.length && item.last_message[0].time} </Text>
                </>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: (width * 90) / 100,
        height: 60,
        flexDirection: "row-reverse",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        // borderBottomWidth: 0.5,
        // borderBottomColor: mainColorWithOpacity(0.2)
        // backgroundColor: colors.danger
    },
    imageContainer: {
        width: 50,
        height: 50,
        backgroundColor: colors.mainColor,
        elevation: 5,
        borderRadius: 40,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 40,
    },
    textContainer: {
        justifyContent: 'center',
        paddingHorizontal: 5,
        alignItems: "flex-end",
        height: "100%",
        flex: 1,
        // backgroundColor: "red"
    },
    name: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        color: colors.ebony,
        textAlign: "right",
    },
    message: {
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        color: colors.grey,
        textAlign: "right",
    },
    time: {
        fontFamily: fonts.tajawalR,
        fontSize: 10,
        color: colors.grey,
        // backgroundColor: "red",
        textAlign: "center",
    },
})
