import axios from "axios";
import { mainDomain } from "../../vars";
import UserClass from "../../authHandler";

export const getUser = async () => {
  return UserClass.getUser();
};

// storing new store in database
export const getCategories = async () => {
  const user = await getUser();
  try {
    const options = {
      method: "GET",
      url: mainDomain + "store/products/categories",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user.token,
      },
    };

    const request = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    // console.log(request);
    return request.data ? request.data : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getProducts = async () => {
  const user = await getUser();
  try {
    const options = {
      method: "GET",
      url: mainDomain + "store/products",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user.token,
      },
    };

    const request = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    // console.log(request);
    return request.success ? request.data : [];
  } catch (error) {
    console.log(error);
    return false;
  }
};
// http://na3eria.sudahex.com/images/default/categories/all.png