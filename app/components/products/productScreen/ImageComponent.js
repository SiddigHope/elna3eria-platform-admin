import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, fonts } from '../../../config/vars';
import * as ImagePicker from 'expo-image-picker';
import MiniHeader from "../../MiniHeader";
import Icon2 from "react-native-vector-icons/MaterialIcons"

const { width, height } = Dimensions.get('window')

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: { uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80" }
    };
  }

  componentDidMount() {
    if (this.props.screen == "edit") {
      this.getData()
    }
  }

  getData = () => {
    this.setState({
      image: { uri: this.props.item.image }
    })
  }




  _imagePicker = async () => {
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
      this.setState({ image: result });
      const image = {
        uri: localUri,
        name: filename,
        type,
      }
      // console.log(image)
      this.props.onChange(image)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: this.state.image.uri }} style={styles.image}>
          <View style={styles.header}>
            <MiniHeader title={""} backgroundColor={colors.white} navigation={this.props.navigation} />
          </View>
          {this.props.editable && (
            <TouchableOpacity onPress={this._imagePicker} style={styles.iconContainer}>
              <Icon name="image-plus" size={40} color={colors.mainColor} />
            </TouchableOpacity>
          )}
          <View style={styles.discountBtnContainer}>
            <TouchableOpacity onPress={this.props.addDiscount} style={styles.discountBtn} >
              <Text style={styles.discountBtnText}> {"اضافة تخفيض"} </Text>
              <Icon2 name="local-offer" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 20,
    right: 0,
    left: 0,
    // zIndex: 11111111
  },
  container: {
    width,
    height: (height * 50) / 100,
    // backgroundColor: 'red'
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.white
  },
  discountBtnContainer: {
    // backgroundColor: "red",
    position: "absolute",
    top: 35,
    right: 10,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  discountBtn: {
    backgroundColor: colors.softGreen,
    borderRadius: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    elevation: 5
  },
  discountBtnText: {
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    color: colors.white
  }
})
