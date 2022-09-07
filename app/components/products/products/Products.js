import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import ProductComponent from './ProductComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../config/vars';
import { goToScreen } from '../../../config/functions';
import { elevations } from '../../../config/elevations';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _listFooter = () => (
        <View style={{ height: 70 }} />
    )

    _listHeader = () => (
        <View style={{ height: 20 }} />
    )

    _itemSeparator = () => (
        <View style={{ height: 20 }} />
    )

    _renderItems = (item, index) => (
        <ProductComponent updateData={this.props.getData} item={item} index={index} _productScreen={this._productScreen} />
    )

    _productScreen = (type, args) => {
        goToScreen("ProductScreen", this.props.navigation, { ...args, screen: type })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.products}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderItems}
                    numColumns={2}
                    // style={{width:"100%", backgroundColor: "blue"}}
                    contentContainerStyle={{alignItems: 'flex-end', marginHorizontal: 20}}
                    ListHeaderComponent={this._listHeader}
                    ListFooterComponent={this._listFooter}
                    ItemSeparatorComponent={this._itemSeparator}
                />
                <Pressable onPress={() => this._productScreen("new")} style={[styles.btnContainer, elevations[5]]}>
                    <Icon name="plus" size={30} color={colors.mainColor} />
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        bottom: 70,
        right: 20
    }
})