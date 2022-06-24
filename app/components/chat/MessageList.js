import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { colors } from '../../config/vars';
import MessageComponent from './MessageComponent';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        // if (nextProps.conversation.messages.length != this.state.messages.length) {
        this.setState({
            messages: nextProps.messages,
        });

        // }
    }
    

    _listHeader = () => (
        <View style={{height: 5}} />
    )

    _listFooter = () => (
        <View style={{height: 5}} />
    )

    _itemSeparator = () => (
        <View style={{height: 5}} />
    )

    _renderItem = (item) => (
        <MessageComponent user={this.props.user} item={item} />
    )
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.messages}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{width: "100%"}}
                    inverted
                    ItemSeparatorComponent={this._itemSeparator}
                    ListFooterComponent={this._listFooter}
                    ListHeaderComponent={this._listHeader}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: colors.blueLight,
    }
})