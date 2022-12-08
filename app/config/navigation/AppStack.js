import React from "react";
import Tabs from "../Tabs";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import Verification from "../../screens/Verification";
import ProductManagement from '../../screens/ProductManagement';
import Products from '../../components/products/products/Products';
import ProductScreen from '../../components/products/productScreen/ProductScreen';
import OrderDetails from '../../screens/OrderDetails';
import Delivery from '../../screens/Delivery';
import DeliveryBoy from '../../components/Delivery/addDelevryBoy/DeliveryBoy';
import EditProfile from '../../screens/EditProfile';
import Home from "../../screens/Home";
import Chats from '../../screens/Chats';
import Chat from '../../screens/Chat';
import About from '../../screens/About';
import PasswordReset from '../../screens/PasswordReset';

const Stack = createStackNavigator();

function AppStack() {
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
            <Stack.Screen
                name="About"
                component={About}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PasswordReset"
                component={PasswordReset}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    );
}

export default AppStack
