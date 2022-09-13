import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { colors } from '../../config/vars';
import ChatsComponent from './ChatsComponent';

const { width, height } = Dimensions.get("window")

export default class ChatsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _renderItem = (item, index) => (
        <ChatsComponent
            item={item.item}
            navigation={this.props.navigation}
            deleteConversation={this.props.deleteConversation}
            deleting={this.props.deleting}
        />
    );

    _itemSeparator = () => (
        <View style={{ height: 20, justifyContent: 'center' }} >
            <View style={{ height: 1, width: "80%", alignSelf: 'center', backgroundColor: colors.softWhite }} />
        </View>
    );


    _listFooter = () => <View style={{ height: 20 }} />;

    _listHeader = () => <View style={{ height: 20 }} />;


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.chats}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
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
        width,
        height,
        backgroundColor: colors.whiteF7
    }
})
