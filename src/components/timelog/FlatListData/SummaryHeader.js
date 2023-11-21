import { View } from "react-native";

const SummaryHeader = ({ themeIs }) => {
  return (
    <View
      className={`${
        themeIs === "light"
          ? "bg-primaryColor"
          : "bg-darkTertiary  border-b border-darkSenary"
      } h-[150] rounded-bl-[40]`}
    />
  );
};

export default SummaryHeader;
