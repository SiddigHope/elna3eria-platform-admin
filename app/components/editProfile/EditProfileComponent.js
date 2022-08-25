import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../config/vars';
import ProfileForms from './ProfileForms';
import { ScrollView, RefreshControl } from 'react-native';
import { updateUserProfile, getUserProfile, updateStoreProfile } from '../../config/apis/authentication';
import UserClass from '../../config/authHandler';

export default class EditProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            user: [],
            updated: false,
            storeLoading: false,
            empLoading: false,
        };
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {
        const user = await UserClass.getUser()
        this.setState({
            user,
        })
        setTimeout(() => {
            this.setState({
                updated: true
            })
        }, 2000)
    }

    submitStoreForm = async (data) => {
        /* STORE Function */
        /* STORE Function */
        /* STORE Function */
        /* STORE Function */
        const { user } = this.state
        this.setState({
            storeLoading: true
        })
        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("description", data.desc)
        formData.append("address", data.address)
        formData.append("phone", data.phone)
        formData.append("delivery_fees", data.deliveryFee)
        formData.append("lat", data.lat)
        formData.append("long", data.long)

        if (data.image.type) {
            formData.append("image", data.image)
        }

        const stored = await updateStoreProfile(formData)

        if (stored) {
            this.setState({
                storeLoading: false
            })
            this.props.navigation.navigate("Tabs")
        } else {
            // console.log("store info not edited")
            // console.log(stored)
            this.setState({
                storeLoading: false
            })
        }
    }

    submitEmpForm = async (data) => {
        /* EMPLOYEE Function */
        /* EMPLOYEE Function */
        /* EMPLOYEE Function */
        /* EMPLOYEE Function */
        this.setState({
            empLoading: true
        })
        const { user } = this.state

        // console.log(data)
        // return

        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("phone", data.phone)

        if (data.image.type) {
            formData.append("image", data.image)
        }

        const stored = await updateUserProfile(formData)

        if (stored) {
            this.setState({
                empLoading: false
            })
            this.props.navigation.navigate("Tabs")
        } else {
            this.setState({
                empLoading: false
            })
        }
    }

    _onRefresh = async () => {
        console.log("refreshing***********************************")
        this.setState({ refreshing: true });
        this.getUser()
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 2000)
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this._onRefresh()}
                        colors={[colors.mainColor, colors.blueLight]}
                        enabled={true}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.container}>
                {this.state.updated ? (
                    <>
                        <ProfileForms
                            empLoading={this.state.empLoading}
                            storeLoading={this.state.storeLoading}
                            submitStoreForm={this.submitStoreForm}
                            submitEmpForm={this.submitEmpForm}
                            user={this.state.user.employee}
                        />
                    </>
                ) : (
                    <View style={[{ flex: 1, justifyContent: 'center' }]}>
                        <ActivityIndicator color={colors.mainColor} size={50} />
                    </View>
                )}
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",

        // justifyContent: 'center'
    }
})