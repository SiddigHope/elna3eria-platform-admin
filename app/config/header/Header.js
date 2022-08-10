import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { colors, fonts } from "../vars";
import Avatar from "./Avatar";
import Input from "./Input";
import { elevations } from '../elevations';
import { goToScreen, openDrawer } from '../functions';
import UserClass from '../authHandler';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    this.setState({
      user: await UserClass.getUser()
    })
  }

  goToChats = () => {
    goToScreen("Chats", this.props.navigation)
  }

  openDrawer = () => {
    openDrawer(this.props.navigation)
  }

  render() {
    // console.log("this.state.user.employee")
    // console.log(this.state.user);
    return (
      <View style={[styles.container, this.props.searching ? { height: 50 } : {}]}>
        <View style={styles.headerContainer}>
          <Avatar user={this.state.user} />
          {this.props.screen == "home" ? (
            <Input closeSearching={this.props.closeSearching} onChangeText={this.props.onChangeText} searching={this.props.searching} />
          ) : (
            <Text style={styles.title}> {this.props.title} </Text>
          )}
          <Pressable onPress={this.openDrawer} style={styles.barsContainer}>
            <View style={[styles.bars, elevations[5]]}></View>
            <View style={[styles.bars, elevations[5], { width: "70%" }]}></View>
            <View style={[styles.bars, elevations[5]]}></View>
          </Pressable>
        </View>
        {this.props.searching || this.props.screen != "home" ? null : (
          <View style={[styles.imageBanner, elevations[10]]}>
            <Image
              style={styles.image}
              source={require("../../../assets/images/publicity.jpg")}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 170,
    width: "100%",
    // backgroundColor: 'red',
    alignItems: "center",
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  barsContainer: {
    height: 25,
    width: 25,
    // backgroundColor: 'red',
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bars: {
    width: "100%",
    height: 5,
    backgroundColor: colors.mainColor,
    borderRadius: 20,
    elevation: 5,
  },
  imageBanner: {
    width: "90%",
    marginTop: 15,
    height: 80,
    borderRadius: 20,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  title: {
    fontFamily: fonts.tajawalB,
    fontSize: 22,
    color: colors.ebony,
  }
});
