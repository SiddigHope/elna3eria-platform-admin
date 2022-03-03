import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../config/vars';
import TextInputRender from './TextInputRender';
import ProfileImage from './ProfileImage';

export default class ProfileForms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            storeName: "",
            address: "",
            phone: "",
            desc: "",
            deliveryFee: 0,
            storeNamePlaceholder: "ادخل الاسم الخاص بالمتجر",
            namePlaceholder: "ادخل اسمك الموظف كاملا",
            deliveryFeePlaceholder: "قيمة التوصيل داخل المنظقة",
            descPlaceholder: "وصف مختصر للمتحر",
            addressPlaceholder: "عنوان المتجر",
            phonePlaceholder: "رقم الهاتف الخاص بالموظف ",
            image: {},
        };
    }

    componentDidMount() {
        this.getUser()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.name != this.state.name) {
            this.setState({
                name: nextProps.user.name,
                email: nextProps.user.email,
                block: nextProps.user.location ? nextProps.user.location[0].block : "",
                address: nextProps.user.location ? nextProps.user.location[0].address : "",
                street: nextProps.user.location ? nextProps.user.location[0].street : "",
                phone: nextProps.user.phone,
                image: nextProps.user.store.image,
                storeName: nextProps.user.store.name,
            })
        }
    }

    getUser = () => {
        const { user } = this.props
        console.log(user)
        this.setState({
            name: user.name,
            storeName: user.store.name,
            email: user.email,
            phone: user.phone,
            image: user.store.image
        })
    }

    submitForm = () => {
        const { name, email, phone, address, block, street } = this.state

        if (name, email) {
            const data = {
                name,
                phone,
                email,
                location: [{
                    address,
                    block,
                    street
                }]
            }
            this.props.submitForm(data)
        } else {
            this.setState({
                loading: false,
                snackbarBackgroundColor: colors.danger,
                snackbarText: "عفوا تأكد من صحة البيانات",
                showSnackbar: true,
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.paddingView}>
                    <Text style={styles.title} > {"بيانات موظف المتجر"} </Text>
                    <View style={styles.rowContainer}>
                        <ProfileImage onChange={(image) => this.setState({ image })} image={this.state.image} />
                        <View style={styles.nameContainer}>
                            <Text style={styles.label} > {"الإسم"} </Text>
                            <TextInputRender
                                type={"name"}
                                placeholder={this.state.namePlaceholder}
                                value={this.state.name}
                                onChange={(name) => this.setState({ name })}
                            />
                        </View>
                    </View>


                    <Text style={styles.label} > {"رقم الهاتف"} </Text>
                    <TextInputRender
                        type={"phone"}
                        placeholder={this.state.phonePlaceholder}
                        value={this.state.phone}
                        onChange={(phone) => this.setState({ phone })}
                    />

                    <TouchableOpacity onPress={this.submitForm} style={styles.btn}>
                        <Text style={styles.btnText}> {"حفط البيانات"} </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.paddingView}>

                    <Text style={styles.title} > {"بيانات المتجر"} </Text>
                    <View style={styles.rowContainer}>
                        <ProfileImage onChange={(image) => this.setState({ image })} image={this.state.image} />
                        <View style={styles.nameContainer}>
                            <Text style={styles.label} > {"اسم المتجر"} </Text>
                            <TextInputRender
                                type={"storeName"}
                                placeholder={this.state.storeNamePlaceholder}
                                value={this.state.storeName}
                                onChange={(storeName) => this.setState({ storeName })}
                            />
                        </View>
                    </View>


                    <Text style={styles.label} > {"الوصف"} </Text>
                    <TextInputRender
                        type={"desc"}
                        placeholder={this.state.descPlaceholder}
                        value={this.state.desc}
                        onChange={(desc) => this.setState({ desc })}
                    />

                    <Text style={styles.label} > {"العنوان"} </Text>
                    <TextInputRender
                        type={"address"}
                        placeholder={this.state.addressPlaceholder}
                        value={this.state.address}
                        onChange={(address) => this.setState({ address })}
                    />

                    <Text style={styles.label} > {"سعر التوصيل"} </Text>
                    <TextInputRender
                        type={"deliveryFee"}
                        placeholder={this.state.deliveryFeePlaceholder}
                        value={this.state.deliveryFee}
                        onChange={(deliveryFee) => this.setState({ deliveryFee })}
                    />

                    <TouchableOpacity onPress={this.submitForm} style={styles.btn}>
                        <Text style={styles.btnText}> {"حفط البيانات"} </Text>
                    </TouchableOpacity>
                </View>







            </View>
        );
    }
}

const styles = StyleSheet.create({
    paddingView: {
        width: "100%",
        padding: 10,
        paddingVertical: 20,
        backgroundColor: colors.white,
        elevation: 10,
        borderRadius: 20,
        marginVertical: 10
    },
    container: {
        width: "90%",
    },
    label: {
        fontFamily: fonts.tajawalB,
        fontSize: 14,
        textAlign: "right",
        color: colors.ebony,
        width: "95%",
    },
    title: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        textAlign: "right",
        color: colors.mainColor,
        marginBottom: 20,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: colors.mainColor,
        borderRadius: 10,
        elevation: 10,
        marginVertical: 20
    },
    btnText: {
        fontFamily: fonts.tajawalB,
        color: colors.white,
        fontSize: 16,
        letterSpacing: 2
    },
    rowContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    nameContainer: {
        flex: 1,
        // backgroundColor: "red",
        marginHorizontal: 10,
    }
})