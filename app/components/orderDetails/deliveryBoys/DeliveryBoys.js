import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DeliveryBoysComponent from './DeliveryBoysComponent';

export default class DeliveryBoys extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _listVerticalMargin = () => (
        <View style={{ height: 20 }} />
    )

    _itemSeparator = () => (
        <View style={{ height: 10 }} />
    )

    _renderItem = (item, index) => (
        <DeliveryBoysComponent selected={this.props.selected} item={item} index={index} onPress={this.props.onPress} />
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.boys}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._listVerticalMargin}
                    ListFooterComponent={this._listVerticalMargin}
                    ItemSeparatorComponent={this._itemSeparator}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // marginBottom: 30,
    }
})