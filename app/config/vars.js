export const colors = {
  mainColor: "#FF8242",
  ebony: "#444D5E",
  white: "#FFF",
  softWhite: "#e3e3e3",
  softBlack: "#333",
  softGreen: "#81c784",
  ratingYellow: "#F4C430",
  danger: "#e57373",
  success: "#a5d6a7",
  darkBlue: "#0d47a1",
  grey: "grey",
  whiteF7: "#F7F7F7",
  blackTransparent: "rgba(0,0,0,0.1)",
  blueLight: '#42a5f5',
  softBlue:"#8ECaE6",
  borderColor: "#DFEAED",
  red: '#FF0011'
};

export const mainColorWithOpacity = (opacity) => {
  return "rgba(255, 130, 66," + opacity + ")"
}

export const fonts = {
  tajawalR: "Tajawal-Regular",
  tajawalB: "Tajawal-Bold",
};

export let itemSelected = -1;

export const setItemSelected = (index) => {
  itemSelected = index;
};

export const mainDomain = "https://pharmacy.nairyah.com/api/v1/";
export const domain = "https://pharmacy.nairyah.com/api/";

// export const mainDomain = "https://nairyah.com/api/v1/";
// export const domain = "https://nairyah.com/api/";
