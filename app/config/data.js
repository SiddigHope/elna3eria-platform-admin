import axios from "axios";
import { mainDomain } from "./vars";


// getting the main departments of the app + its stores
export const storeCategories = async () => {
  try {
    const options = {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        long: -91.026966,
        lat: 4.077705,
      }),
    };

    const data = await fetch(mainDomain + "departments", options)
      .then((response) => response.json())
      .catch((error) => console.log(error));

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// searching for stores by the store name and its distance (long, lat)
export const storesSearch = async (lat, long, text) => {
  try {
    const options = {
      method: "POST",
      url: mainDomain + "stores/search",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        lat: lat,
        long: long,
        search_key: text,
      },
    };

    const data = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    console.log(data.matches);

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getting product's categories and the products it self for certain store by the (store_id) param

export const productsCategories = async (store_id) => {
  try {
    const options = {
      method: "POST",
      url: mainDomain + "stores/categories",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        store_id,
      },
    };

    const data = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};


// searching for products by the product name and the store_id
export const productsSearch = async (store_id, search_key) => {
  try {
    const options = {
      method: "POST",
      url: mainDomain + "products/search",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        store_id,
        search_key,
      },
    };

    const data = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    console.log(store_id);

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
