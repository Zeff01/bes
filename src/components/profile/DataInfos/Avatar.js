import { View, Image } from "react-native";

const Avatar = ({ data, themeIs }) => {

  return (
    <View
      className={`
    ${
      themeIs === "light"
        ? "bg-gray-300 h-[126] w-[126]"
        : "bg-darkSenary h-[123] w-[123] "
    }
      rounded-full 
      top-[-63] 
      justify-center 
      items-center 
      absolute
    `}
    >
      <View
        className={`${
          themeIs === "light" ? "bg-primaryColor" : "bg-darkTertiary"
        } h-[120] w-[120] rounded-full justify-center items-center absolute`}
      >
        <Image
          className="w-[110] h-[110] rounded-full"
          src={`https://bes.outposter.com.au/images/avatars/${data.avatar}`}
        />
      </View>
    </View>
  );
};

export default Avatar;
