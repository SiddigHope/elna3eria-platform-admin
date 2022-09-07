import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import ChatComponent from '../components/chat/ChatComponent';
import { colors } from '../config/vars';
import UserClass from '../config/authHandler';
import { getConversation, getSupportConversation } from '../config/apis/chats/gets';
import { sendMessage } from '../config/apis/chats/posts';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: {},
            user: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getConversation()
    }

    getConversation = async () => {
        const { type, receiver } = this.props.route.params
        let conversation = this.props.route.params.conversation
        const user = await UserClass.getUser();
        let messages = []

        if (type == "support") {
            conversation = await getSupportConversation()
            if (conversation) {
                this.setState({
                    conversation,
                    user,
                })
            }
        } if (type == "order") {
            const data = {
                client_id: receiver.id
            }
            conversation = await sendMessage(data, "openConversationWithClient")
            console.log("conversation")
            // console.log(conversation.messages)
            if (conversation) {
                this.setState({
                    conversation,
                    user,
                })
            }
        } else {
            messages = await getConversation(conversation.id)
        }
        if (messages) {
            console.log("inside messages condition");
            if (type != "support" && type != "order") {
                this.setState({
                    conversation: { ...conversation, messages },
                    user,
                })
            }
            setTimeout(() => {
                this.setState({
                    loading: false
                })
            }, 1000)
        }
    }


    render() {
        const { type, receiver, conversation } = this.props.route.params
        const client = type == "support" || type == "order" ? receiver : conversation.client
        // console.log("this.state.conversation")
        // console.log(this.state.user)
        return (
            <View style={styles.container} >
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                {/* {!this.state.loading ? ( */}
                <ChatComponent
                    type={type}
                    receiver={client}
                    navigation={this.props.navigation}
                    conversation={this.state.conversation}
                    user={this.state.user.employee}
                />
                {/* ) : (
                    <View style={[styles.container, { justifyContent: 'center' }]}>
                        <ActivityIndicator color={colors.mainColor} size={"large"} />
                    </View>
                )} */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7
    }
});
