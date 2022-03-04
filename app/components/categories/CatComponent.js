import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    Pressable,
} from "react-native";
import elevations from "../../config/elevations";
import { colors, font } from "./../../config/vars";

export default class CatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemSelected: false,
            // selected: this.props.item.index
        };
    }

    componentDidMount() {
        this.checkSelected();
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.selected !== this.props.item.index) {
            this.setState({
                itemSelected: false,
            });
        }
    }

    checkSelected = () => {
        if (this.props.selected == this.props.item.index) {
            this._setSelected();
        } else {
            this.setState({
                itemSelected: false,
            });
        }
    };

    _setSelected = () => {
        console.log("this.props.item")
        console.log(this.props.item)
        this.props.changeSelected(this.props.item.index);
        this.setState({
            itemSelected: true,
        });
    };

    render() {
        const item = this.props.item.item;
        return (
            <Pressable onPress={this._setSelected} style={[styles.container]}>
                <View
                    style={[
                        styles.item,
                        elevations[5],
                        this.state.itemSelected
                            ? { backgroundColor: colors.mainColor }
                            : {},
                    ]}
                >
                    <Text numberOfLines={1} style={styles.title}>
                        {" "}
                        {item.name}{" "}
                    </Text>
                    <View style={[styles.imageContainer, elevations[3]]} >
                        {item.icon ? item.icon : (
                            <Image
                                borderRadius={10}
                                source={{ uri: item.image }}
                                style={styles.image}
                            />
                        )}
                    </View>
                </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
        justifyContent: "center",
        // backgroundColor: "red",
    },
    item: {
        height: 40,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    title: {
        fontFamily: "Tajawal-Regular",
        color: colors.ebony,
        fontSize: 12,
        maxWidth: "90%",
        textAlign: "center",
        marginBottom: 2,
    },
    imageContainer: {
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: colors.white
    },
    image: {
        width: 25,
        height: 25,
        alignItems: "center",
        borderRadius: 15,
        justifyContent: "flex-end",
    },
});
