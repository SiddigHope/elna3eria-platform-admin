import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChatsList from '../components/chats/ChatsList';
import { colors } from '../config/vars';
import { getConversations } from '../config/apis/chats/gets';
import MiniHeader from '../components/MiniHeader';
import { StatusBar } from 'expo-status-bar';

export default class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            chatsBackup: []
        };
    }

    componentDidMount() {
        this.getChats()
    }

    getChats = async () => {
        const chats = await getConversations()
        this.setState({
            chats: [chats[0], chats[0],chats[0]],
            chatsBackup: chats
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} style={"dark"} />
                <MiniHeader navigation={this.props.navigation} right={"dk"} title={"المحادثات"} />
                <ChatsList navigation={this.props.navigation} chats={this.state.chats} />
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
