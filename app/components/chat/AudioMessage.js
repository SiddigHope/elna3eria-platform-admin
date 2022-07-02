import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../config/vars';
import { ProgressBar } from 'react-native-paper';

const { width, height } = Dimensions.get("window")
export default function AudioMessage({ message }) {

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playbackObject, setPlaybackObject] = React.useState(null);
    const [playbackStatus, setPlaybackStatus] = React.useState(null);
    const [duration, setDuration] = React.useState(null);
    const [position, setPosition] = React.useState(null);
    const [finish, setFinish] = React.useState(false);

    React.useEffect(() => {
        if (playbackObject === null) {
            setPlaybackObject(new Audio.Sound());
        }
    }, []);

    const onPlaybackStatusUpdate = async (status) => {
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);
        setFinish(status.didJustFinish);
        if (status.didJustFinish) {
            playbackObject.unloadAsync()
            // setPlaybackObject(null)
            setIsPlaying(false)
            setPlaybackStatus(null)
        }
        // console.log("status from update");
        // console.log(status);
    }

    const handleAudioPlayPause = async () => {
        // console.log("playbackStatus from handle function")
        // console.log(playbackStatus)

        if (playbackObject !== null && playbackStatus === null) {
            playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            const status = await playbackObject.loadAsync(
                { uri: message.message },
                { shouldPlay: true },
            );
            setIsPlaying(true);
            return setPlaybackStatus(status);
        }

        // It will pause our audio
        if (playbackStatus.isPlaying) {
            const status = await playbackObject.pauseAsync();
            setIsPlaying(false);
            return setPlaybackStatus(status);
        }
        if (finish) {
            console.log("paying from finish");
            const status = await playbackObject.playAsync();
            setIsPlaying(true);
            return setPlaybackStatus(status);
        }
        // It will resume our audio

        if (!playbackStatus.isPlaying) {
            const status = await playbackObject.playAsync();
            setIsPlaying(true);
            if (!status.shouldPlay) {
                console.log("end of the functions")
            }
            return setPlaybackStatus(status);
        }


    };

    const getProgress = () => {
        if (playbackObject === null || duration === null || position === null) {
            return 0;
        }

        // console.log(typeof (Math.round((position / duration) * 100) / 100))
        const progress = Math.round((position / duration) * 100) / 100
        if (!progress) {
            return
        }
        // console.log(Math.round((((position / duration) * 100)/ 100) * 100));
        return progress
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleAudioPlayPause} style={styles.playBtn}>
                <Icon name={isPlaying ? "pause" : "play"} color={colors.mainColor} size={30} />
            </TouchableOpacity>
            <ProgressBar style={styles.progress} progress={getProgress()} color={colors.white} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center'
    },
    playBtn: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        // backgroundColor: "red",
        width: (width * 50) / 100,
        marginLeft: 10
    }
})