import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import OrderComponent from './OrderComponent';
import { colors } from '../../config/vars';

export default class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: this.props.orders ? this.props.orders : []
        };
    }

    // componentDidMount() {
    //     const navigation = this.props.navigation
    //     navigation.addListener("focus", () => {
    //         this.props.refreshData()
    //     })
    // }

    // componentWillUnmount() {
    //     const navigation = this.props.navigation
    //     navigation.removeListener("focus")
    // }

    componentWillReceiveProps(nextProps) {
        if (this.state.orders.length != nextProps.orders.length) {
            this.setState({
                orders: nextProps.orders,
            })
        }
    }

    _itemSeparator = () => (
        <View style={{ height: 20 }} />
    )

    _listHeader = () => (
        <View style={{ height: 5 }} />
    )

    _listFooter = () => (
        <View style={{ height: 80 }} />
    )

    _renderItem = (item, index) => (
        <OrderComponent onPress={this.props.onPress} item={item.item} index={index} />
    )


    render() {
        // console.log(this.state.orders)
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.orders}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._listHeader}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListFooterComponent={this._listFooter}
                    ItemSeparatorComponent={this._itemSeparator}
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
    },
})