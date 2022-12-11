import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { getStatisticsTotals, getStatisticsLatest } from '../../config/apis/home/gets';
import CardComponent from './CardComponent';
import LatestComponent from './LatestComponent';
import { colors, fonts } from '../../config/vars';


const { width, height } = Dimensions.get("window")

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latest: [],
            totals: []
        };
    }

    componentDidMount() {
        this.getData()

        const navigation = this.props.navigation
        navigation.addListener("focus", () => {
            this.getData()
        })
    }

    componentWillUnmount() {
        const navigation = this.props.navigation
        navigation.removeListener("focus")
    }

    getData = async () => {
        const totals = await getStatisticsTotals()
        const latest = await getStatisticsLatest()
        // console.log("latest.orders")
        // console.log(latest.orders)
        this.setState({
            totals,
            latest: latest.orders,
        })
    }


    _itemSeparator = () => (
        <View style={{ height: 20 }} />
    )

    _listHeader = () => (
        <View style={{ marginVertical: 20 }}>
            <Text style={styles.title}> {"أخر الإحصائيات"} </Text>
            <View style={styles.rowContainer}>
                <CardComponent
                    figure={this.state.totals.orders_count}
                    title={"اجمالي الطلبات"}
                    id={0}
                    navigation={this.props.navigation}
                    color1={colors.borderColor}
                    color2={colors.mainColor}
                />
                <CardComponent
                    navigation={this.props.navigation}
                    color1={colors.white}
                    color2={"#e0cc1a"}
                    figure={this.state.totals.new_orders_count}
                    id={1}
                    title={"طلب جديد"} />
            </View>
            <View style={styles.rowContainer}>
                <CardComponent
                    navigation={this.props.navigation}
                    color1={"#00D4FF"}
                    color2={"#1adde0"}
                    figure={this.state.totals.preparing_orders_count}
                    id={2}
                    title={"جار التجهيز"} />
                <CardComponent
                    color1={"#41e01a"}
                    color2={"#b2e01a"}
                    id={3}
                    navigation={this.props.navigation}
                    figure={this.state.totals.on_road_orders_count}
                    title={"في الطريق"} />
            </View>
            <View style={styles.rowContainer}>
                <CardComponent
                    color1={colors.whiteF7}
                    navigation={this.props.navigation}
                    color2={colors.softGreen}
                    id={4}
                    figure={this.state.totals.completed_orders}
                    title={"طلب مكتمل"} />
                <CardComponent
                    color1={colors.whiteF7}
                    color2={colors.danger}
                    navigation={this.props.navigation}
                    figure={this.state.totals.canceled_orders_count}
                    id={5}
                    title={"طلب ملغي"} />
            </View>
            {this.state.latest.length != 0 && (
                <Text style={styles.title}> {"أخر الطلبات"} </Text>
            )}
        </View>
    )

    _listFooter = () => (
        <View style={{ height: 180 }} />
    )

    _renderItem = (item, index) => (
        <LatestComponent onPress={this.props.onPress} item={item.item} index={index} />
    )

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.latest}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._listHeader}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListFooterComponent={this._listFooter}
                    ItemSeparatorComponent={this._itemSeparator}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    rowContainer: {
        width,
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 10
    },
    title: {
        fontFamily: fonts.tajawalR,
        fontSize: 16,
        color: colors.ebony,
        // marginVertical: 10,
        textAlign: "right",
        marginTop: 20,
        marginHorizontal: 20
    }
})