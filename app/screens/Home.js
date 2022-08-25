import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import HomeComponent from '../components/home/HomeComponent';
import Header from '../config/header/Header';
import { colors } from '../config/vars';
import UserClass from '../config/authHandler';
import { goToScreen, setUserCurrentLocation } from '../config/functions';
import * as Location from 'expo-location';


const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = ((width * 90) / 100) / ((height * 40) / 100);
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    componentDidMount() {
        this.getCurrentLocation()
        this.getUser()
    }

    getCurrentLocation = async () => {
        // console.log("watching user current location");
        // console.log(await Location.watchPositionAsync());
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log("location.coords");
            console.log(location.coords);
            const loc = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            setUserCurrentLocation(loc)

        } catch (error) {
            console.log(error);
        }
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