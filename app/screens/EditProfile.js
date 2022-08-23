import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/vars';
import MiniHeader from '../components/MiniHeader';
import EditProfileComponent from '../components/editProfile/EditProfileComponent';
import { getUserProfile } from '../config/apis/authentication';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <MiniHeader right="ddd" title={"تعديل البروفايل"} navigation={this.props.navigation} />
                <EditProfileComponent navigation={this.props.navigation} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.whiteF7
    }
})