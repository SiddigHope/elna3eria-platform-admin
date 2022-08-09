import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DeliveryBoys from '../components/Delivery/DeliveryBoys';
import MiniHeader from '../components/MiniHeader';
import { getDeliveryBoys } from '../config/apis/delivery/gets';
import { colors } from '../config/vars';

export default class Delivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boys: []
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
            boys: await getDeliveryBoys()
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                <MiniHeader right={"kk"} title={"دلفري بوي"} navigation={this.props.navigation} />
                <DeliveryBoys getData={this.getData} boys={this.state.boys} navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        width: "100%",
        backgroundColor: colors.whiteF7,
    },
});
