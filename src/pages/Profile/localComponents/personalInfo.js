function PersonalInfo({ iconName, text, content }) {
    return (
      <View className="justify-center items-center flex-row w-full px-[30] py-[4]">
        <View className="ml-20 pl-10 flex-row w-full justify-start items-center">
          <Ionicons name={iconName} size={22} color="#2B6673" />
          <Text className="ml-3 text-base text-primaryColor">{content}</Text>
        </View>
      </View>
    );
  }