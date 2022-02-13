import axios from "axios";
import { mainDomain } from "../../vars";
import UserClass from "../../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};

// storing new store in database
export const storeProduct = async (data) => {
    const user = await getUser();
    try {
        const options = {
            method: "POST",
            url: mainDomain + "store/products",
            headers: {
                "Content-Type": "multipart/from-data",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data,
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));

        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateProduct = async (data, id) => {
    const user = await getUser();
    try {
        const options = {
            method: "POST",
            url: mainDomain + "store/products/" + id + "?_method=PUT",
            headers: {
                "Content-Type": "multipart/from-data",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data,
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));

        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const deleteProduct = async (id) => {
    const user = await getUser();
    try {
        const options = {
            method: "DELETE",
            url: mainDomain + "store/products/" + id,
            headers: {
                "Content-Type": "multipart/from-data",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));

        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
