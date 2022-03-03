import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
            storePhone: "",
            desc: "",
            deliveryFee: 0.0,
            storeNamePlaceholder: "ادخل الاسم الخاص بالمتجر",
            namePlaceholder: "ادخل اسمك الموظف كاملا",
            deliveryFeePlaceholder: "قيمة التوصيل داخل المنظقة",
            descPlaceholder: "وصف مختصر للمتحر",
            addressPlaceholder: "عنوان المتجر",
            phonePlaceholder: "رقم الهاتف الخاص بالموظف ",
            storePhonePlaceholder: "رقم واتساب الخاص بالمتحر ",
            image: {},
            userImage: "",
        };
    }

    componentDidMount() {
        this.getUser()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.name != this.state.name) {
            this.setState({
                name: nextProps.user.name,
                desc: nextProps.user.store.description,
                storePhone: nextProps.user.store.phone,
                deliveryFee: nextProps.user.store.delivery_fees,
                address: nextProps.user.store.address,
                phone: nextProps.user.phone,
                image: nextProps.user.store.image,
                userImage: nextProps.user.image,
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
            userImage: user.image,
            image: user.store.image,
            desc: user.store.description,
            storePhone: user.store.phone,
            deliveryFee: user.store.delivery_fees,
            address: user.store.address,
        })
    }

    submitStoreForm = () => {
        const { storeName, desc, address, deliveryFee, image, storePhone } = this.state

        if (storeName) {
            const data = {
                name: storeName,
                address,
                image,
                desc,
                deliveryFee,
                phone: storePhone
            }
            this.props.submitStoreForm(data)
        } else {
            this.setState({
                loading: false,
                snackbarBackgroundColor: colors.danger,
                snackbarText: "لابد من ادخال حقل اسم المتجر",
                showSnackbar: true,
            });
        }
    }

    submitEmpForm = () => {
        const { name, phone, userImage } = this.state

        if (name) {
            const data = {
                name,
                phone,
                image: userImage,
            }
            this.props.submitEmpForm(data)
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
        // console.log(this.state.deliveryFee)
        return (
            <View style={styles.container}>

                <View style={styles.paddingView}>
                    <Text style={styles.title} > {"بيانات موظف المتجر"} </Text>
                    <View style={styles.rowContainer}>
                        <ProfileImage onChange={(image) => this.setState({ userImage: image })} image={this.state.userImage} />
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

                    <TouchableOpacity onPress={this.submitEmpForm} style={styles.btn}>
                        {this.props.empLoading ? (
                            <ActivityIndicator color={colors.white} size="small" />
                        ) : (
                            <Text style={styles.btnText}> {"حفط البيانات"} </Text>
                        )}
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

                    <Text style={styles.label} > {"رقم واتساب"} </Text>

                    <TextInputRender
                        type={"storePhone"}
                        placeholder={this.state.storePhonePlaceholder}
                        value={this.state.storePhone}
                        onChange={(storePhone) => this.setState({ storePhone })}
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
                        value={String(this.state.deliveryFee)}
                        onChange={(deliveryFee) => this.setState({ deliveryFee })}
                    />

                    <TouchableOpacity onPress={this.submitStoreForm} style={styles.btn}>
                        {this.props.storeLoading ? (
                            <ActivityIndicator color={colors.white} size="small" />
                        ) : (
                            <Text style={styles.btnText}> {"حفط البيانات"} </Text>
                        )}
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