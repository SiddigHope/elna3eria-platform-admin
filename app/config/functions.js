import React, { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Platform, BackHandler, Alert } from "react-native";
// import { Snackbar } from "react-native-paper";
import { colors, fonts } from "./vars";
import SnackBar from "react-native-snackbar-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import elevations from "./elevations";
import shorthash from 'shorthash'
import * as FileSystem from "expo-file-system"

export const goToScreen = (screen, navigation, props) => {
  let parameters = props ? props : {};

  navigation.navigate(screen, parameters);
};

export const getDeviceToken = async () => {
  const token = await AsyncStorage.getItem('elna3eriaStoreToken')
  return token ? token : ''
}

export async function cacheImage({ uri }) {
  if (uri != null && uri != '') {
    const name = shorthash.unique(uri) // for just extracting the name from the whole uri
    // console.log("short name image:" + name)
    const path = `${FileSystem.cacheDirectory}${name}`
    const image = await FileSystem.getInfoAsync(path)

    if (image.exists) {
      // console.log("reading image from cache")
      // console.log(image.uri)
      return { uri: image.uri }
    }

    // console.log("downloading image to cache")
    const newImage = await FileSystem.downloadAsync(uri, path)
    // console.log(newImage.uri)
    return { uri: newImage.uri }

  } else {
    console.log("uri is null")

    return require('../../assets/images/avatar.png')
  }
}

export const setSnackBarOptions = ({ text, backgroundColor, textColor, time }) => {
  snackBarOptions = {
    text,
    backgroundColor,
    show: true,
    time: time ? time : 3000,
    textColor: textColor ? textColor : colors.white,
  }
}

let snackBarOptions = {
  text: "",
  backgroundColor: colors.whiteF7,
  show: false,
  time: 3000
}

export const ShowSnackbarEnhanced = () => {
  const [show, setShow] = React.useState(snackBarOptions.show)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
      snackBarOptions = {
        text: "",
        backgroundColor: colors.whiteF7,
        show: false
      }
    }, snackBarOptions.time)
  }, [show]);

  return (
    show ? (
      <View style={[styles.container, elevations[10], { backgroundColor: snackBarOptions.backgroundColor, top: Platform.select({ ios: 30, android: 10 }) }]} >
        <Text style={[styles.message, { color: snackBarOptions.textColor }]}>{snackBarOptions.text}</Text>
      </View>
    ) : <View />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    width: Dimensions.get("window").width,
    minHeight: 50,
    // borderRadius: 10,
    backgroundColor: colors.whiteF7,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10
  },
  message: {
    fontFamily: fonts.tajawalR,
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center"
  }
})

export function ShowSnackbar({ text, backgroundColor, show, closeSnackbar }) {
  useEffect(() => {
    setTimeout(() => {
      closeSnackbar();
    }, 3000)
  }, [show]);
  return (
    <SnackBar
      visible={show}
      textMessage={text}
      backgroundColor={backgroundColor}
      containerStyle={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
      messageStyle={{ fontFamily: fonts.tajawalR, flex: 1, textAlign: 'right', alignSelf: 'center', }}
    />
  );
}

export const openDrawer = (navigation) => {
  navigation.openDrawer()
}

export const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const saveAppInfo = async (data) => {
  AsyncStorage.setItem("elna3eriaStoreAppInfo", JSON.stringify(data))
}

export const getAppInfo = async () => {
  const data = await AsyncStorage.getItem("elna3eriaStoreAppInfo")
  if (data != null) {
    return JSON.parse(data)
  }

  return []
}

export const setUserCurrentLocation = async (location) => {
  AsyncStorage.setItem("elna3eriaStoreCurrentLocation", JSON.stringify(location))
}

export const getUserCurrentLocation = async () => {
  const location = await AsyncStorage.getItem("elna3eriaStoreCurrentLocation")
  if (location != null) {
    return JSON.parse(location)
  }

  return []
}