import { View, Text } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function CustomDrawer(props) {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      console.log("logout");
      const token = await AsyncStorage.removeItem("@auth_token");
      console.log("logout", token);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <View className="flex-1">
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="p-10">
        <TouchableOpacity
          className="bg-red-500 py-2 px-4 w-[140px] rounded-md"
          onPress={handleLogout}
        >
          <View className="flex-row items-center">
            <IonIcons name="exit-outline" size={22} className="text-white" />
            <Text className="ml-4 font-bold text-lg text-white">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
