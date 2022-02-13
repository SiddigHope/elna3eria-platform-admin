import axios from "axios";
import { mainDomain } from "./../vars";
import UserClass from "../authHandler";

export const getUser = async () => {
  return UserClass.getUser();
};

// storing new store in database
export const newStore = async (data) => {
  try {
    const options = {
      method: "POST",
      url: mainDomain + "store/auth/register",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    };

    const request = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    return request.data ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const login = async (data) => {
  try {
    const options = {
      method: "POST",
      url: mainDomain + "store/auth/login",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    };

    const request = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    return request.success ? request.data : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDepartments = async () => {
  try {
    const options = {
      method: "GET",
      url: mainDomain + "store/auth/departments",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const request = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    // console.log(request);
    // return [];
    return request.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const verify = async (data) => {
  const user = await getUser();
  try {
    const options = {
      method: "POST",
      url: mainDomain + "store/auth/otp/confirm",
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
    if (request.success) {
      user.is_verified = true;
      UserClass.setUser(user);
    }
    return request.success ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const resendCode = async () => {
  const user = await getUser();
  try {
    const options = {
      method: "GET",
      url: mainDomain + "store/auth/otp/resend",
      headers: {
        "Content-Type": "application/json",
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