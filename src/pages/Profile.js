import React from "react";
import { View, Image } from "react-native";
import SignOut from "../navigation/SignOut";

export default function Profile() {
  return (
    <View>
      <View className="h-[200] bg-primary flex justify-center items-center">
        <View className="bg-septenary w-[160] h-[160] rounded-full flex justify-center items-center">
          <Image
            className="w-[150] h-[150] rounded-full"
            source={{
              uri: "https://img.huffingtonpost.com/asset/59f0a4c5180000360ddfc330.jpeg?ops=scalefit_630_noupscale",
            }}
          />
        </View>
      </View>
      <SignOut />
    </View>
  );
}
