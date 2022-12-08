import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { elevations } from '../elevations';
import { colors } from '../../../.expo-shared/app/config/vars';
import { cacheImage, goToScreen } from "./../functions";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: { uri: this.props.user ? this.props.user.employee.image : "" }
    };
  }

  componentDidMount() {
    this._loadImage()
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if(nextProps.user){
      this._loadImage({ uri: nextProps.user.employee.image })
    }
  }

  _loadImage = async (uri) => {
    let image = await cacheImage({ uri: this.props.user && this.props.user.employee.image })
    if (uri) {
      image = await cacheImage(uri)
    }
    this.setState({ image, })
    // return image
  }

  goToScreen = () => {
    goToScreen("EditProfile", this.props.navigation, { user: this.props.user.employee })
  }

  render() {
    const { user } = this.props
    // console.log("user")
    // console.log(user)
    return (
      <Pressable onPress={this.goToScreen} style={[styles.container, elevations[5]]}>
        <Image style={styles.image} source={this.state.image} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: colors.white
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
})