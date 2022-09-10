import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Animated, Platform } from 'react-native';
import { colors } from '../../config/vars';
import MessageComponent from './MessageComponent';

const { width, height } = Dimensions.get("window")

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            paddingAnimation: new Animated.Value(0)
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        // if (nextProps.conversation.messages.length != this.state.messages.length) {
        this.setState({
            messages: nextProps.messages,
        });

        this.animateToValue(nextProps.paddingBottom)

        // }
    }

    animateToValue = (value) => {
        const paddingValue = Platform.select({ ios: value, android: value && value + 40 })
        Animated.timing(this.state.paddingAnimation, { toValue: paddingValue, duration: 300 }).start();
    }

    _listHeader = () => (
        <View style={{ height: 10 }} />
    )

    _listFooter = () => (
        <View style={{ height: 5 }} />
    )

    _itemSeparator = () => (
        <View style={{ height: 5 }} />
    )

    _renderItem = (item) => (
        <MessageComponent user={this.props.user} item={item} />
    )
    render() {
        return (
            <Animated.View style={[styles.container, { paddingBottom: this.state.paddingAnimation }]}>
                <FlatList
                    data={this.props.messages}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%" }}
                    // contentContainerStyle={{justifyContent: "flex-start"}}
                    inverted
                    ItemSeparatorComponent={this._itemSeparator}
                    ListFooterComponent={this._listFooter}
                    ListHeaderComponent={this._listHeader}
                    renderItem={this._renderItem}
                />
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        maxHeight: height - Platform.select({ ios: 170, android: 120 }),
        alignItems: 'center',
        // backgroundColor: colors.blueLight,
    }
})