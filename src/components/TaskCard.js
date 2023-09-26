import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Task from "./Task";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TaskCard() {
  const [isClicked, setIsClicked] = useState(false);

  const toggleIconStyle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View className="bg-tertiaryColor rounded-t-[40] py-8 px-5 mt-14 w-full flex">
      <View className="rounded-xl pb-2">
        <View className="flex-row items-center justify-between px-3 pb-3">
          <Text Text className="text-primaryColor font-black text-xl tracking-widest">Tasks</Text>
          <TouchableOpacity
            onPress={toggleIconStyle}
            style={{
              backgroundColor: isClicked ? '#2B6673' : 'white',
              borderRadius: 999,
              padding: 8,
              borderWidth: 1,
              borderColor: isClicked ? '#2B6673' : 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Ionicons name="add-outline" size={20} color={isClicked ? 'white' : '#87B0B6'} />
          </TouchableOpacity>
        </View>

        <View>
          <ScrollView className="my-2">
            <Task task="Task 1" />
            <Task task="Task 2" />
            <Task task="Task 3" />
            <Task task="Task 4" />
          </ScrollView>
        </View>
      </View>



    </View>
  );
}
