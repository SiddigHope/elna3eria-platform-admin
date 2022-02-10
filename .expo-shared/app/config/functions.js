export const goToScreen = (screen, navigation, props) => {
  let parameters = props?props:{}
  // console.log("parameters")
  // console.log(parameters)
  // return
  navigation.navigate(screen,parameters);
};
