import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { resetPassword } from '../config/apis/authentication';
import { goToScreen, ShowSnackbar } from '../config/functions';
import { colors } from '../config/vars';
import PasswordResetComponent from '../components/password-reset/PasswordResetComponent';

export default class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            loading: false,
            backgroundColor: "",
            show: false,
            resent: false
        };
    }

    toggleSnackbar = (text, backgroundColor,) => {
        this.setState({
            text,
            backgroundColor,
            show: true,
            loading: false
        })
    }

    alertUser = (message) => {
        Alert.alert("", message)
    }

    check = async (data) => {
        this.setState({ loading: true })

        const response = await resetPassword(data)

        if (response) {
            this.setState({
                loading: false
            })
            const message = response.errors ? response.errors.email[0] : response.success? response.data:response.message
            this.alertUser(message)
            if (response.success) {
                this.props.navigation.goBack()
            }
        } else {
            this.toggleSnackbar("تأكد من صحة البريد الإلكتروني و اعد المحاولة", colors.danger)
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <PasswordResetComponent
                    check={this.check}
                    resent={this.state.resent}
                    loading={this.state.loading}
                    _showSnackbar={this.toggleSnackbar}
                    navigation={this.props.navigation}
                />

                <ShowSnackbar
                    show={this.state.show}
                    closeSnackbar={() => this.setState({ show: false })}
                    text={this.state.text}
                    backgroundColor={this.state.backgroundColor}
                />
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    }
})