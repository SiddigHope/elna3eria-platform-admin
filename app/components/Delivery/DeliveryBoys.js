import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import DeliveryBoysComponent from './DeliveryBoysComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../config/vars';
import { goToScreen } from '../../config/functions';

export default class DeliveryBoys extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _listFooter = () => (
        <View style={{ height: 120 }} />
    )

    _listHeader = () => (
        <View style={{ height: 20 }} />
    )

    _itemSeparator = () => (
        <View style={{ height: 20 }} />
    )

    _renderItems = (item, index) => (
        <DeliveryBoysComponent updateData={this.props.getData} item={item} index={index} _boysScreen={this._boysScreen} />
    )

    _boysScreen = (type, args) => {
        goToScreen("DeliveryBoy", this.props.navigation, { ...args, screen: type })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.boys}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderItems}
                    // numColumns={2}
                    ListHeaderComponent={this._listHeader}
                    ListFooterComponent={this._listFooter}
                    ItemSeparatorComponent={this._itemSeparator}
                />
                <Pressable onPress={() => this._boysScreen("new")} style={styles.btnContainer}>
                    <Icon name="plus" size={30} color={colors.mainColor} />
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // backgroundColor: colors.danger,
    },
    btnContainer: {
        backgroundColor: colors.white,
        elevation: 5,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        position: 'absolute',
        bottom: 50,
        right: 20
    }
})