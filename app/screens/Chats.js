import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, BackHandler, ActivityIndicator } from 'react-native';
import ChatsList from '../components/chats/ChatsList';
import { colors } from '../config/vars';
import { getConversations } from '../config/apis/chats/gets';
import Header from '../config/header/Header';
import { StatusBar } from 'expo-status-bar';
import { deleteConversation } from '../config/apis/chats/posts';

export default class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            chatsBackup: [],
            deleting: false,
            loading: true
        };
        this.navigation = this.props.navigation

    }

    componentDidMount() {
        this.getChats()
        this.navigation.addListener("focus", () => {
            this.getChats()
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    }

    componentWillUnmount() {
        this.navigation.removeListener("focus")
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.props.navigation.isFocused()) {
            Alert.alert(
                '',
                'هل حقاً تريد قفل التطبيق',
                [
                    {
                        text: 'لا',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'نعم', onPress: () => BackHandler.exitApp() },
                ],
                { cancelable: false },
            );
            return true;
        }
        // return true;  // Do nothing when back button is pressed
    };


    getChats = async () => {
        const chats = await getConversations()
        this.setState({
            chats,
            chatsBackup: chats,
            loading: false
        })
    }

    deleteClientConversations = async (id) => {
        const { chats } = this.state
        console.log("deleting conversation #NO:" + id)
        this.setState({
            deleting: true
        })

        const deleted = await deleteConversation(id)

        if (deleted) {
            console.log("conversation #NO:" + id + " has been deleted")
            this.setState({
                chats: chats.filter(chat => chat.id != id)
            })
        }

        this.setState({
            deleting: false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                <Header
                    screen="chats"
                    title={"المحادثات"}
                    closeSearching={() => console.log("closing")}
                    searching={false}
                    onChangeText={(text) => console.log(text)}
                    navigation={this.props.navigation}
                />
                {this.state.loading ? (
                    <View style={[styles.container, { justifyContent: 'center' }]}>
                        <ActivityIndicator color={colors.mainColor} size="large" />
                    </View>
                ) : (
                    <ChatsList
                        navigation={this.props.navigation}
                        chats={this.state.chats}
                        deleteConversation={this.deleteClientConversations}
                        deleting={this.state.deleting}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7
    }
})
