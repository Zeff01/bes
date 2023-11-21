import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TImelogCard = (props) => {
  return (
    <View
      className={`${
        props.themeIs === "light" ? "bg-white" : "bg-darkSecondary"
      } rounded-lg w-[48%] h-[150px] justify-center items-center mx-1`}
      style={{
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
      <Icon
        name={props.icon}
        size={30}
        color={props.themeIs === "light" ? "#87B0B6" : "#aaedfc"}
        className="mx-auto mb-2"
      />
      <Text
        className={`${
          props.themeIs === "light" ? "text-secondaryColor" : "text-whiteColor"
        } text-2xl font-bold`}
      >
        {props.number}
      </Text>
      <Text
        className={`${
          props.themeIs === "light" ? "text-blackColor" : "text-whiteColor"
        } text-center font-light text-sm`}
      >
        {props.description}
      </Text>
    </View>
  );
};

export default TImelogCard;
