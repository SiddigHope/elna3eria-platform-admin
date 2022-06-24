import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import Tabs from "./app/config/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import SplashScreen from "./app/screens/SplashScreen";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Signin from "./app/screens/Signin";
import Signup from "./app/screens/Signup";
import Verification from "./app/screens/Verification";
import ProductManagement from './app/screens/ProductManagement';
import Products from './app/components/products/products/Products';
import ProductScreen from './app/components/products/productScreen/ProductScreen';
import OrderDetails from './app/screens/OrderDetails';
import Delivery from './app/screens/Delivery';
import DeliveryBoy from './app/components/Delivery/addDelevryBoy/DeliveryBoy';
import EditProfile from './app/screens/EditProfile';
import Home from "./app/screens/Home";
import Chats from './app/screens/Chats';
import Chat from './app/screens/Chat';

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

console.disableYellowBox = true

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
    <Stack.Navigator
      // initialRouteName="Tabs"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
      }}
    >
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
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
      <Stack.Screen
        name="Signup"
        component={Signup}
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
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductManagement"
        component={ProductManagement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={Products}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeliveryBoy"
        component={DeliveryBoy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
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
