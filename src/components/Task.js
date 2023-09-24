import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Task({ task }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View
      className="bg-white p-4 rounded-lg mx-2 mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={toggleCheckbox} style={{ padding: 5 }}>
            <Ionicons
              name={isChecked ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={32}
              color={isChecked ? '#2B6673' : '#87B0B6'}
            />
          </TouchableOpacity>
          <Text className="text-normal text-black font-light">{task}</Text>
        </View>

        <Ionicons name="create-outline" size={20} color="#87B0B6" />
      </View>
    </View>
  );
}
