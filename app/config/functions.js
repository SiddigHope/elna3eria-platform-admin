import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { colors, fonts } from "./vars";
import SnackBar from "react-native-snackbar-component";

export const goToScreen = (screen, navigation, props) => {
  let parameters = props ? props : {};
  // console.log("parameters")
  // console.log(parameters)
  // return
  navigation.navigate(screen, parameters);
};

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
      messageStyle={{fontFamily:fonts.tajawalR,flex: 1, textAlign: 'right', alignSelf:'center', }}
    />
  );
}
