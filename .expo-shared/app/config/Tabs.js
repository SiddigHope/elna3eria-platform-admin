import React, { useEffect, useRef, useLayoutEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import UserProfile from "../screens/UserProfile";
import Search from "../screens/Search";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/SimpleLineIcons";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import { colors } from "./vars";

const { width, height } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

function TabButton(props) {
  const { focused, icon, title, color } = props;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <View style={[styles.tabContainer, focused ? styles.focusedTab : {}]}>
      <Animatable.View
        ref={viewRef}
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: colors.mainColor, borderRadius: 30, height: '70%', marginTop: 8 },
        ]}
      />
      <View
        style={focused ? styles.iconContainerFocused : styles.iconContainer}
      >
        {icon}
      </View>
      <Animatable.View
        ref={textViewRef}
        style={[styles.labelContainer, !focused ? { display: "none" } : {}]}
      >
        {focused ? (
          <Text
            style={[
              styles.tabsLabels,
              {
                color: color,
              },
            ]}
          >
            {title}
          </Text>
        ) : null}
      </Animatable.View>
    </View>
  );
}

function Tabs({ navigation }) {
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        style="dark"
      />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarInactiveTintColor: colors.ebony,
          tabBarActiveTintColor: colors.ebony,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.white,
            height: 65,
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 15,
          },
        }}
      >
        <Tab.Screen
          name="UserPofil"
          component={UserProfile}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, }) => (
              <TabButton
                focused={focused}
                color={color}
                icon={
                  <Icon1
                    style={styles.tabIcon}
                    name="person-outline"
                    size={20}
                    color={color}
                  />
                }
                title={"حسابي"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabButton
                focused={focused}
                color={color}
                icon={
                  <Icon
                    style={styles.tabIcon}
                    name="tag-heart-outline"
                    size={20}
                    color={color}
                  />
                }
                title={"تخفيضات"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="UserProfil"
          component={UserProfile}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabButton
                focused={focused}
                color={color}
                icon={
                  <Icon3
                    style={styles.tabIcon}
                    name="handbag"
                    size={20}
                    color={color}
                  />
                }
                title={"طلباتي"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabButton
                focused={focused}
                color={color}
                icon={
                  <Icon2
                    style={styles.tabIcon}
                    name="home"
                    size={20}
                    color={color}
                  />
                }
                title={"الرئيسية"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    marginVertical: 5,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 30,
    flex: 1,
  },
  focusedTab: {
    // justifyContent: "flex-start",
    // alignItems: "center",
    flexDirection: "row",
    flex: 1,
    width: "120%",
  },
  labelContainer: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'green',
    height: "100%",
  },
  tabsLabels: {
    fontFamily: "Tajawal-Regular",
    fontSize: 12,
    color: colors.ebony,
    textAlign: "center",
    // backgroundColor: 'grey'
  },
  iconContainer: {
    flex: 0.4,
    marginLeft: 5,
    // backgroundColor: 'red'
  },
  iconContainerFocused: {
    flex: 0.3,
    marginLeft: 5,
    // backgroundColor: 'red'
  },
});
