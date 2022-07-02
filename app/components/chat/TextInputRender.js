import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { colors, fonts, mainColorWithOpacity } from '../../config/vars';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get("window")

export default class TextInputRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordingActive: false,
        };
        this.recording = new Audio.Recording()
    }


    selectImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);

        let type = match ? `image/${match[1]}` : `image`;

        if (!result.cancelled) {
            const image = {
                uri: localUri,
                name: filename,
                type,
            }
            console.log(image)
            // return
            this.props.submitImage(image, "image")
        }
    }

    onStartRecord = async () => {
        try {
            this.setState({
                recordingActive: true
            })
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            await this.recording.prepareToRecordAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            await this.recording.startAsync();
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    onStopRecord = async () => {
        this.setState({
            recordingActive: false
        })
        console.log('Stopping this.recording..');
        await this.recording.stopAndUnloadAsync();
        const uri = this.recording.getURI();
        console.log('Recording stopped and stored at', uri);
        ////////
        let localUri = uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the audio
        let match = /\.(\w+)$/.exec(filename);

        let type = match ? `audio/${match[1]}` : `audio`;

        if (uri) {
            const audio = {
                uri: localUri,
                name: filename,
                type,
            }
            // console.log(audio)
            //////
            this.props.submitAudio(audio, "audio")
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textInputCont}>
                    {this.state.recordingActive ? (
                        <LottieView
                            style={styles.recording}
                            source={require('../../../assets/animations/96109-soundwave.json')}
                            autoPlay
                            loop
                        />
                    ) : (
                        <>
                            <TextInput
                                textAlign='right'
                                style={styles.textInput}
                                placeholder={"أكتب رسالتك..."}
                                multiline
                                value={this.props.message}
                                placeholderTextColor={colors.grey}
                                onChangeText={(message) => this.props.textChange(message)}
                            />
                            <TouchableOpacity onPress={this.selectImage} style={styles.imageIconCont}>
                                <Icon name='image' color={colors.whiteF7} size={20} />
                            </TouchableOpacity>
                        </>
                    )}

                </View>
                <TouchableOpacity
                    onLongPress={this.onStartRecord}
                    onPressOut={this.onStopRecord}
                    style={styles.sendBtnCont}
                    onPress={this.props.submitMessage}
                >
                    {this.props.loading ? (
                        <ActivityIndicator color={colors.white} size="small" />
                    ) : (
                        <Icon name={this.props.typing && this.props.message ? "send" : "microphone"} color={colors.white} size={20} />
                    )}
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width,
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    textInputCont: {
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: 'center',
        minHeight: 40,
        maxHeight: 80,
        paddingLeft: 20,
        backgroundColor: colors.blackTransparent,
        borderRadius: 20,
        marginLeft: 5,
    },
    textInput: {
        flex: 1,
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        color: colors.ebony,
        lineHeight: 20,
        minHeight: 40,
        maxHeight: 80,
        // backgroundColor: colors.mainColor,
    },
    sendBtnCont: {
        backgroundColor: colors.success,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIconCont: {
        backgroundColor: colors.grey,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // btnIcon: {
    //     transform: [{ rotate: '43deg' }]
    // },
})