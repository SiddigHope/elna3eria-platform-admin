import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrdersList from '../components/orders/OrdersList';
import { getOrders } from '../config/apis/orders/gets';
import Header from '../config/header/Header';
import { colors } from '../config/vars';
import { goToScreen } from '../config/functions';
import { StatusBar } from 'expo-status-bar';

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        this.getData()
        const navigation = this.props.navigation
        navigation.addListener("focus", () => {
            this.getData()
        })
    }

    componentWillUnmount() {
        const navigation = this.props.navigation
        navigation.removeListener("focus")
    }

    getData = async () => {
        this.setState({
            orders: await getOrders()
        })
    }

    onOrderPressed = (order) => {
        console.log()
        goToScreen("OrderDetails", this.props.navigation, { order })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                <Header
                    screen="orders"
                    title="طلباتي"
                    closeSearching={() => console.log("closing")}
                    searching={false}
                    onChangeText={(text) => console.log(text)}
                />
                <OrdersList onPress={this.onOrderPressed} orders={this.state.orders.orders} navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7,
    }
})