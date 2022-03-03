import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProfileComponent from "../components/profile/ProfileComponent";
import Header from "../config/header/Header";
import { colors } from '../config/vars';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.whiteF7} translucent={false} />
                <Header title={"بروفايل"} />
                <ProfileComponent navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: colors.whiteF7
    }
})