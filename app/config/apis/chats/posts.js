import axios from "axios";
import { mainDomain } from "../../vars";
import UserClass from "../../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};

export const sendMessage = async (data, type) => {
    const user = await getUser()
    const method = type ? "PUT" : "POST"
    try {
        const options = {
            method,
            url: mainDomain + "store/conversations",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error.response));

        // return
        return type ? request.data : request.id ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const sendSupportMessage = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "store/support/message",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error.response));
        // console.log(request)
        // return
        return request.id ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteConversation = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "DELETE",
            url: mainDomain + "store/conversations/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            }
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error.response));
        // console.log(request)
        // return
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}