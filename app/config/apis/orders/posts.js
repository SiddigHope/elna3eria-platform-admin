import axios from "axios";
import { mainDomain } from "../../vars";
import UserClass from "../../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};

export const updateOrder = async (id, data) => {
    const user = await getUser()
    try {
        const options = {
            method: "PUT",
            url: mainDomain + "store/orders/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data,
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

export const assignDeliveryBoy = async (id, data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "store/orders/assign/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data,
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