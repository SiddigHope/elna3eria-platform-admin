import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView, Image } from 'react-native';
import MiniHeader from '../components/MiniHeader';
import OrderDetailsComponent from '../components/orderDetails/OrderDetailsComponent';
import { getOrder } from '../config/apis/orders/gets';
import { updateOrder } from '../config/apis/orders/posts';
import { colors } from '../config/vars';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import elevations from '../config/elevations';
import { goToScreen } from '../config/functions';

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            order: this.props.route.params.order
        };
    }


    componentDidMount() {
        console.log(this.props.route.params.order);
    }

    changeStatus = async (code) => {
        const data = {
            status: code
        }
        const updated = await updateOrder(this.props.route.params.order.id, data)
        if (updated) {
            this._onRefresh()
        }
    }

    _onRefresh = async () => {
        console.log("refreshing***********************************")
        this.setState({ refreshing: true });
        const order = await getOrder(this.state.order.id)
        this.setState({
            order,
        })
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 2000)
    }

    onPress = () => {
        goToScreen("Chat", this.props.navigation, { receiver: this.state.order.client, type: "order" })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.mainColor} style="light" />
                <MiniHeader navigation={this.props.navigation} title={"تفاصيل الطلب"} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                            colors={[colors.mainColor, colors.blueLight]}
                            enabled={true}
                        />
                    }
                    showsVerticalScrollIndicator={false}>
                    <OrderDetailsComponent
                        refresh={this._onRefresh}
                        changeStatus={this.changeStatus}
                        order={this.state.order}
                    />
                </ScrollView>
                <TouchableOpacity style={[styles.chatBtn, elevations[10]]} onPress={this.onPress} >
                    <Icon name="chatbox-ellipses-outline" color={colors.white} size={30} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainColor
    },
    chatBtn: {
        backgroundColor: colors.success,
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        position: 'absolute',
        bottom: 20,
        left: 20
    }
})
