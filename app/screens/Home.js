import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeComponent from '../components/home/HomeComponent';
import Header from '../config/header/Header';
import { colors } from '../config/vars';
import UserClass from '../config/authHandler';
import { goToScreen } from '../config/functions';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {
        const user = await UserClass.getUser()
        this.setState({
            user: user.employee.store,
        })
    }

    onOrderPressed = (order) => {
        // console.log()
        goToScreen("OrderDetails", this.props.navigation, { order })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={colors.whiteF7} />
                <Header navigation={this.props.navigation} title={this.state.user.name} />
                <HomeComponent onPress={this.onOrderPressed} navigation={this.props.navigation} />
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