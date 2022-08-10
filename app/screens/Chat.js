import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import ChatComponent from '../components/chat/ChatComponent';
import { colors } from '../config/vars';
import UserClass from '../config/authHandler';
import { getConversation, getSupportConversation } from '../config/apis/chats/gets';

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
        let conversation = this.props.route.params.conversation
        let messages = []
        if (this.props.route.params.type == "support") {
            conversation = await getSupportConversation()
            if (conversation) {
                this.setState({
                    conversation,
                    user: await UserClass.getUser(),
                })
            }
        } else {
            messages = await getConversation(conversation.id)
        }
        if (messages) {
            if (this.props.route.params.type != "support") {
                this.setState({
                    conversation: { ...conversation, messages },
                    user: await UserClass.getUser(),
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
        console.log("this.state.conversation")
        console.log(this.state.conversation)
        return (
            <View style={styles.container} >
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                {/* {!this.state.loading ? ( */}
                <ChatComponent
                    type={this.props.route.params.type}
                    receiver={this.props.route.params.type == "support" ? this.props.route.params.receiver : this.props.route.params.conversation.client}
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
