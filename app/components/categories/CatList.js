import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CatComponent from "./CatComponent";

const { width, height } = Dimensions.get("window");

export default class CatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _renderItem = (item, index) => (
        <CatComponent
            item={item}
            navigation={this.props.navigation}
            index={index}
            selected={this.props.selected}
            changeSelected={this.props.changeSelected}
        />
    );

    _itemSeparator = () => <View style={{ width: 20 }} />;


    _listFooter = () => <View style={{ width: 20 }} />;

    render() {
        return (
            <View style={[styles.container]}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    inverted
                    ListFooterComponent={this._listFooter}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 55,
        justifyContent: "center",
        // backgroundColor: '#e3e3e3'
    },
});
