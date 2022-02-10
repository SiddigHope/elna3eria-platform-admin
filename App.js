import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import Tabs from "./app/config/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import UserProfile from "./app/screens/UserProfile";
// import Home from "./app/screens/Home";
import SplashScreen from "./app/screens/SplashScreen";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
// import Categories from "./app/screens/Categories";
// import StoreProducts from "./app/screens/StoreProducts";
// import ProductDetails from "./app/screens/ProductDetails";
import Signin from "./app/screens/Signin";
import Signup from "./app/screens/Signup";
import Verification from "./app/screens/Verification";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const loadFonts = () => {
  return Font.loadAsync({
    "Tajawal-Regular": require("./assets/fonts/Tajawal-Regular.ttf"),
    "Tajawal-Bold": require("./assets/fonts/Tajawal-Bold.ttf"),
    "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
  });
};

const Stack = createStackNavigator();

function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="StoreProducts"
        component={StoreProducts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MainScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stacks />
      {/* <Signin/> */}
    </NavigationContainer>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
