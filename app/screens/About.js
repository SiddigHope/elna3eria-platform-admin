import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/vars';
import MiniHeader from '../components/MiniHeader';
import { WebView } from 'react-native-webview';
import { getAppInfo } from '../config/apis/gets';
import { saveAppInfo, getAppInfo as getLocalAppInfo } from '../config/functions';



export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: []
            start: `<!DOCTYPE html>
            <html dir="rtl">

            <head>
                <title>Font Awesome Icons</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet"> 
            </head>

            <style>
                *{
                    font-family: 'Tajawal', sans-serif;
                    background-color: ${colors.whiteF7}
                }
            </style>

            <body>`,
            end: `</body>
            </html>`,
            terms: "",
            privacy: "",
            about: "",
            script: "<script src=http://na3eria.sudahex.com/js/app.js></script>"
        };
    }

    componentDidMount() {
        this.getLocalData()
        this.getData()
    }

    getLocalData = async () => {
        const data = await getLocalAppInfo()

        // console.log(data)
        if (data) {
            this.setState({
                terms: data.data.terms,
                policy: data.data.privacy,
                about: data.data.about
            })
        }
    }

    getData = async () => {
        const data = await getAppInfo()
        if (data.data) {
            this.setState({
                terms: data.data.terms,
                policy: data.data.privacy,
                about: data.data.about
            })
            saveAppInfo(data.data)
            console.log(data.data)
        }
    }

    render() {
        const { start, about, terms, privacy, script, end } = this.state
        const { type } = this.props.route.params
        const html = type == "about" ? about : terms + privacy
        return (
            <View style={styles.container}>
                <MiniHeader
                    right={"djk"}
                    navigation={this.props.navigation}
                    title={type == "about" ? "عن التطبيق" : "السياسات و اللوائح"}
                />
                <WebView
                    originWhitelist={['*']}
                    source={{ html: start + html + script + end }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteF7
    }
})
