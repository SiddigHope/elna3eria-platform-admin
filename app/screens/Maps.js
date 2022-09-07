import * as React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { GOOGLE_API_KEY } from '../../keys';
import {
    GooglePlacesAutocomplete,
    GooglePlaceDetail
} from 'react-native-google-places-autocomplete';
import elevations from './../config/elevations';
import { colors, fonts } from '../config/vars';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
    latitude: 40.767110,
    longitude: -73.979704,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}

// navigator.geolocation = require('expo-location');

function InputAutocomplete({ label, placeholder, onPlaceSelected }) {
    return (
        <>
            {/* <Text>{label}</Text> */}
            <GooglePlacesAutocomplete
                // currentLocation={true}
                styles={{ textInput: styles.input, row: { flexDirection: 'row-reverse' }, description: { fontFamily: fonts.tajawalR }, poweredContainer: { flexDirection: 'row-reverse' } }}
                placeholder={placeholder}
                fetchDetails
                onFail={(error) => console.log(error)}
                onPress={(data, details) => {
                    onPlaceSelected(details)
                }}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'ar'
                }}
            />
        </>
    )
}

export default function Maps({
    navigation,
    location,
    clientLocation,
    setLocation,
    closeModal,
    editLocation,
    setEditLocation,
    showUserLocation,
    screen,
    store,
    client
}) {
    const [origin, setOrigin] = React.useState(location)
    const [destination, setDestination] = React.useState(clientLocation)

    const [latitude, setLatitude] = React.useState(0)
    const [longitude, setLongitude] = React.useState(0)
    const [currentLocation, setCurrentLocation] = React.useState(location)

    const mapRef = React.useRef(null)

    const moveTo = async (position) => {
        const camera = await mapRef.current.getCamera()
        if (camera) {
            camera.center = position
            mapRef.current.animateCamera(camera, { duration: 1000 })
        }
    }

    const onRegionChange = (region) => {
        setOrigin(region)
        setLocation(region)
    }

    const onPlaceSelected = (details, flag) => {
        const set = flag === "origin" ? setOrigin : setDestination

        // console.log(details.address_components[0].long_name);
        const position = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
        }

        set(position)
        setLocation(position)
        moveTo(position)
    }

    const onPress = async () => {
        setEditLocation()
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                zoomControlEnabled={true}
                showsUserLocation
                // showsUserLocation={showUserLocation}
                showsMyLocationButton={editLocation}
                onPress={(e) => {
                    if (screen == "order") return
                    const position = {
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                        latitudeDelta: INITIAL_POSITION.latitudeDelta,
                        longitudeDelta: INITIAL_POSITION.longitudeDelta
                    }
                    console.log(position)
                    onRegionChange(position)
                }}
                // onRegionChange={onRegionChange}
                provider={PROVIDER_GOOGLE}
                initialRegion={currentLocation}
            >
                {origin && screen != "order" ? (
                    <Marker
                        coordinate={origin}
                        title={`${store.name} :متجر`}
                        draggable={screen != "order"}
                        onDragEnd={(e) => {
                            const position = {
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                                latitudeDelta: INITIAL_POSITION.latitudeDelta,
                                longitudeDelta: INITIAL_POSITION.longitudeDelta
                            }
                            console.log(position)
                            onRegionChange(position)
                        }}
                    />
                ) : null}
                {destination && screen == "order" ? (
                    <Marker
                        coordinate={destination}
                        title={`${client.name} :العميل`}
                        draggable={screen != "order"}
                        onDragEnd={(e) => {
                            const position = {
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                                latitudeDelta: INITIAL_POSITION.latitudeDelta,
                                longitudeDelta: INITIAL_POSITION.longitudeDelta
                            }
                            console.log(position)
                            onRegionChange(position)
                        }}
                    />
                ) : null}
            </MapView>
            {screen == "order" ? null : editLocation ? (
                <View style={[styles.searchContainer, elevations[4]]}>
                    <InputAutocomplete
                        placeholder={"ابحث هنا..."}
                        label={"Origin"}
                        onPlaceSelected={(details) => onPlaceSelected(details, "origin")}
                    />
                </View>
            ) : (
                <TouchableOpacity onPress={onPress} style={styles.btn} >
                    <Text style={styles.btnText}> {"تعديل"} </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: "100%",
        height: "100%",
    },
    searchContainer: {
        position: 'absolute',
        top: Constants.statusBarHeight,
        width: '90%',
        backgroundColor: colors.whiteF7,
        elevation: 4,
        padding: 5,
        borderRadius: 8,
    },
    input: {
        borderWidth: 0.5,
        borderColor: colors.mainColor,
        fontFamily: fonts.tajawalR,
        borderRadius: 10,
        textAlign: 'right'
    },
    btn: {
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.mainColor,
        elevation: 10,
        position: 'absolute',
        top: 10,
        right: 10
    },
    btnText: {
        fontFamily: fonts.tajawalr,
        fontSize: 14,
        color: colors.white,
    }
});
