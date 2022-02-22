import axios from "axios";
import { mainDomain } from "../../vars";
import UserClass from "../../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};


export const getOrders = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "store/orders",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log(user)
        // return
        return request.data ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getOrder = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "store/orders/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
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