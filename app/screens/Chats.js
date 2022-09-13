import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChatsList from '../components/chats/ChatsList';
import { colors } from '../config/vars';
import { getConversations } from '../config/apis/chats/gets';
import MiniHeader from '../components/MiniHeader';
import { StatusBar } from 'expo-status-bar';
import { deleteConversation } from '../config/apis/chats/posts';

export default class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            chatsBackup: [],
            deleting: false
        };
    }

    componentDidMount() {
        this.getChats()
    }

    getChats = async () => {
        const chats = await getConversations()
        this.setState({
            chats,
            chatsBackup: chats
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
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} style={"dark"} />
                <MiniHeader navigation={this.props.navigation} right={"dk"} title={"المحادثات"} />
                <ChatsList
                    navigation={this.props.navigation}
                    chats={this.state.chats}
                    deleteConversation={this.deleteClientConversations}
                    deleting={this.state.deleting}
                />
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
