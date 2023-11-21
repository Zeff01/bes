import { Text } from "react-native";

const TimelogHeader = ({ themeIs }) => {
  return (
    <Text
      className={`${
        themeIs === "light" ? "text-[#0B646B]" : "text-whiteColor"
      } text-lg font-light tracking-widest p-4 uppercase text-center`}
    >
      Time Logs
    </Text>
  );
};

export default TimelogHeader;
