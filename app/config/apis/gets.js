import axios from "axios";
import { mainDomain } from "../vars";
import UserClass from "../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};


export const getAppInfo = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "store/info",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.data ? request : [];
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const hasNewMessage = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "store/conversations/check-new-message",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log("request new message check")
        console.log(request)
        // return
        return request.success ? request.data : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}