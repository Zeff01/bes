import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    return token;
  } catch (err) {
    console.log("Error in getting token: ", token);
  }
};
