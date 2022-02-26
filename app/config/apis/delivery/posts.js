import axios from "axios";
import { mainDomain } from "../../vars";
import UserClass from "../../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};

export const addDeliveryBoy = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "store/deliveryBoys",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(request)
        // return
        return request.data ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const updateDeliveryBoy = async (data, id) => {
    const user = await getUser()
    // console.log("data")
    // console.log(data)
    // console.log("id")
    // console.log(id)
    // return
    try {
        const options = {
            method: "POST",
            url: mainDomain + "store/deliveryBoys/" + id + "?_method=put",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(request)
        // return
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteDeliveryBoy = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "DELETE",
            url: mainDomain + "store/deliveryBoys/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            }
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log(user)
        // return
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
