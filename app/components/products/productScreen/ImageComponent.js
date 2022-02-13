import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../../config/vars';
import * as ImagePicker from 'expo-image-picker';

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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
          {this.props.editable && (
            <TouchableOpacity onPress={this._imagePicker} style={styles.iconContainer}>
              <Icon name="image-plus" size={40} color={colors.mainColor} />
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: (height * 50) / 100,
    backgroundColor: 'red'
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: "center", alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.white
  }
})
