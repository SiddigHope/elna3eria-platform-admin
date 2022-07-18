import axios from "axios";
import { mainDomain } from "../../vars";
import UserClass from "../../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};

export const getStatisticsTotals = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "store/statistic/totals",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log(request)
        // return
        return request.data ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

// TODO added pages only, need to apply the api then design for returned data

export const getStatisticsLatest = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "store/statistic/latest",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                return []
            });
        // console.log(request)
        // return
        return request.data ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}
