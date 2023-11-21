import { View, Text } from "react-native";

const Info = ({ data, themeIs }) => {

  return (
    <View className="mt-[70] mb-[20]">
      <Text
        className={`${
          themeIs === "light" ? "text-primaryColor" : "text-whiteColor"
        } text-4xl font-black text-center mt-3`}
      >
        {data.name}
      </Text>
      <Text
        className={`${
          themeIs === "light" ? "text-blackColor " : "text-darkSenary"
        } text-md font-light text-center uppercase tracking-widest`}
      >
        {data.position}
      </Text>
    </View>
  );
};

export default Info;
