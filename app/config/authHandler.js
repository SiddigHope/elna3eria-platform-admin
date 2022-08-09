import AsyncStorage from "@react-native-async-storage/async-storage";

var UserClass = (() => {
  var user = [];
  var getUser = async () => {
    const data = await AsyncStorage.getItem("elna3eria_store_user");
    if (data != null) {
      // console.log(JSON.parse(data))
      return JSON.parse(data);
    }
    return user;
  };

  var setUser = (userData) => {
    user = userData;
    AsyncStorage.setItem("elna3eria_store_user", JSON.stringify(userData));
  };

  var isAuthenticated = async () => {
    const data = await AsyncStorage.getItem("elna3eria_store_user");
    if (data != null) {
      return true;
    }
    return false;
  };

  var logout = function () {
    AsyncStorage.removeItem("elna3eria_store_user");
    user = [];
  };

  return {
    getUser,
    setUser,
    isAuthenticated,
    logout,
  };
})();

export default UserClass;
