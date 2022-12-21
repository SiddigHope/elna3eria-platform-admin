import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, ImageBackground, Pressable, Image, Linking } from 'react-native';
import { colors } from '../../config/vars';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import TextInputRender from './TextInputRender';
import Echo from 'laravel-echo';
import { sendMessage, sendSupportMessage, setMessageAsRead } from '../../config/apis/chats/posts';
import { elevations } from '../../config/elevations';
import { PUSHER_KEY } from '../../../keys';
import { Platform } from 'react-native';

const Pusher = require('pusher-js')
const { width, height } = Dimensions.get("window")

export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
            conversation: [],
            user: {},
            loading: false,
            typing: false,
            keyboardHeight: 0,
        };
        this.echo = new Echo({
            broadcaster: 'pusher',
            // host: 'http://na3eria.sudahex.com',
            client: undefined,
            key: PUSHER_KEY,
            cluster: "eu",
            // encrypted: true,
            forceTLS: true,
            disableStats: true
        });
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
        this._keyboardDidHide = this._keyboardDidHide.bind(this)
    }

    componentDidMount() {
        const { user, conversation } = this.props
        this.setState({
            conversation,
            messages: conversation.messages,
            user,
        })
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow)
        Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide)
    }

    _keyboardDidShow(e) {
        console.log("e.endCoordinates.height")
        console.log(e.endCoordinates.height)
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })
    }

    _keyboardDidHide(e) {
        console.log("keyboard id hiding")
        this.setState({
            keyboardHeight: 0,
            // keyboardHeight: 0,
            focused: false
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        // if (nextProps.conversation.messages.length != this.state.messages.length) {
        this.setState({
            messages: nextProps.conversation.messages,
            user: nextProps.user,
            conversation: nextProps.conversation
        });
        this.listenToChannel(nextProps.conversation, nextProps.conversation.messages)

        // }
    }

    listenToChannel = async (conversation) => {
        console.log("conversation should start listening")
        console.log(conversation.id)

        this.echo.channel('conversation.' + conversation.id)
            .listen('MessageSent', event => {
                const { messages } = this.state
                // console.log("event")
                // console.log(event)
                console.log("messages")
                const messageCheck = messages.filter(message => message.id === event.message.id)
                console.log(messageCheck);
                if (messageCheck.length == 0) {
                    messages.unshift(event.message)
                    this.setState({ messages })
                    // if (event.message.sender_type != "App\\Models\\Store" && !event.message.is_read) {
                    //     setMessageAsRead(event.message.id)
                    // }
                }
            })
    }

    writeMessage = (message) => {
        this.setState({
            message,
            typing: true
        })
    }

    submitFile = async (file, type) => {
        const fromData = new FormData()

        fromData.append("message", file)
        // fromData.append("sender_id", this.state.user.id)
        fromData.append("type", type)
        fromData.append("conversation_id", this.state.conversation.id)

        let messageSent = false

        if (this.props.type == "support") {
            messageSent = await sendSupportMessage(fromData)
        } else {
            messageSent = await sendMessage(fromData)
        }
        if (messageSent) {
            console.log("message sent successfully")
            this.setState({ message: "", loading: false })
            return
        }
        console.log("message not sent")
    }


    submitMessage = async () => {
        const { message, loading } = this.state
        if (loading) return
        if (message != '') {
            this.setState({ loading: true })
            const data = {
                conversation_id: this.state.conversation.id,
                message: message,
            }

            let messageSent = false

            if (this.props.type == "support") {
                messageSent = await sendSupportMessage(data)
            } else {
                messageSent = await sendMessage(data)
            }
            if (messageSent) {
                console.log("message sent successfully")
                this.setState({ message: "", loading: false })
                return
            }
            this.setState({ loading: false })
            console.log("message not send")
            return
        }
        console.log("the message is empty")
    }

    whatsapp = () => {
        const link = "https://wa.me/" + "966595995566"
        Linking
            .canOpenURL(link)
            .then(supported => {
                if (!supported) {
                    Alert.alert(
                        'قم بتنزيل تطبيق الواتساب للمراسلة الفورية او بامكانك استحدام حاصية الاتصال المباشر'
                    );
                } else {
                    return Linking.openURL(link);
                }
            })
            .catch(err => console.error('An error occurred', err));
    }


    render() {
        // console.log(this.state.messages && this.state.messages.length)
        return (
            <ImageBackground source={require('../../../assets/icons/chatBackground.png')} style={styles.container}>
                <ChatHeader
                    client={this.props.receiver}
                    navigation={this.props.navigation}
                />
                <View style={{ height: height - Platform.select({ ios: 160, android: 120 }), width }}>
                    <MessageList
                        paddingBottom={this.state.keyboardHeight}
                        user={this.props.user}
                        messages={this.state.messages}
                    />
                </View>
                {this.props.type == "support" && (
                    <Pressable onPress={this.whatsapp} style={[styles.iconContainer, elevations[5], { marginLeft: 10 }]}>
                        <Image style={{ width: 30, height: 30 }} source={require("../../../assets/icons/headset.png")} />
                    </Pressable>
                )}
                <TextInputRender
                    submitAudio={this.submitFile}
                    submitImage={this.submitFile}
                    loading={this.state.loading}
                    message={this.state.message}
                    typing={this.state.typing}
                    textChange={this.writeMessage}
                    submitMessage={this.submitMessage}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width,
        // height,
        backgroundColor: colors.whiteF7
    },
    iconContainer: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        backgroundColor: colors.mainColor,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        width: 50,
        height: 50,
        borderRadius: 50
    },
})
