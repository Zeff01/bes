import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignOut = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.removeItem("@auth_token");
      console.log("logout", token);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <TouchableOpacity
      className="w-[150] py-4 bg-primaryColor rounded-full self-center mt-10"
      onPress={handleLogout}
    >
      <Text className="text-whiteColor font-bold text-center">SIGN OUT</Text>
    </TouchableOpacity>
  );
};

export default SignOut;
