import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import elevations from '../../config/elevations';
import { colors, fonts } from '../../config/vars';
import TextInputRender from './TextInputRender';
import { goToScreen } from '../../config/functions';


const { width, height } = Dimensions.get("window")

export default class PasswordResetComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            secureTextEntry: true,
            color: colors.softBlack
        };
    }

    _verify = async () => {
        const { email } = this.state

        if (email) {
            const data = {
                email,
            }

            this.props.check(data)

        } else {
            this.props._showSnackbar("تأكد من إدخال البريد الالكتروني بشكل صحيح", colors.danger)
        }
    }

    goToScreen = (screen) => {
        goToScreen(screen, this.props.navigation)
    }

    render() {
        return (
            <View style={styles.container} >

                <Text style={[styles.signinText]}> {"إعادة تعيين كلمة المرور"} </Text>
                <Text style={styles.emailOption}>  {"سيتم ارسال الخطوات على البريد الالكتروني"} </Text>

                <TextInputRender
                    placeholder="ادخل البريد الالكتروني"
                    value={this.state.email}
                    secureTextEntry={false}
                    onChange={(email) => this.setState({ email })}
                />


                <TouchableOpacity onPress={this._verify} style={[styles.btnContainer, elevations[10]]}>
                    {this.props.loading ? (
                        <ActivityIndicator color={colors.white} size="large" />
                    ) : (
                        <Text style={styles.btnText}> {"إرسال"} </Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.signupText}>
                    {"ليس لديك حساب؟"}
                    <Text onPress={() => this.goToScreen("Signup")} style={styles.signupLink}>
                        {" انشاء حساب حديد"}
                    </Text>
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.white,
        height: height,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signinText: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.mainColor,
        marginVertical: 20
    },
    socialMedia: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 30,
    },
    emailOption: {
        fontFamily: fonts.tajawalR,
        color: colors.grey
    },
    btnContainer: {
        backgroundColor: colors.mainColor,
        width: "100%",
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginTop: 10,
    },
    btnText: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.white
    },
    nestedText: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10
    },
    parentText: {
        fontFamily: fonts.tajawalR,
        fontSize: 12,
        color: colors.grey,
        lineHeight: 30,
        // backgroundColor: "red"
    },
    childText: {
        fontFamily: fonts.tajawalB,
        fontSize: 12,
        color: colors.softBlack,
        textDecorationLine: 'underline'
    },
    resend: {
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        color: colors.softBlack,
        // backgroundColor: 'red',
        alignSelf: "flex-end",
        textDecorationLine: 'underline',
        marginTop: 10
    },
    signupText: {
        fontFamily: fonts.tajawalR,
        fontSize: 14,
        color: colors.grey,
        marginVertical: 20
    },
    signupLink: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        color: colors.mainColor,
        textDecorationLine: 'underline'
    },
})