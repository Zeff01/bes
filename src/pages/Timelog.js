import React, { useState, useEffect, useRef, useContext } from "react";
import { BASE_URL, GET_TIMELOG } from "@env";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// components
import getData from "../components/api/getData";
import TimelogData from "../components/timelog/TimelogData";

// context
import ThemeContext from "../store/darkMode/theme-context";
import Flatlist from "../components/timelog/Flatlist";

const Timelog = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = getData(`${BASE_URL}${GET_TIMELOG}`);

  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);

  const flatListRef = useRef();

  const isFocused = useIsFocused();

  const { themeIs } = useContext(ThemeContext);

  const flatData = data.data ? data.data.flat() : [];

  const handleScrollToTop = (offsetDistance) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: offsetDistance,
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleScrollToTop(0);
    }
  }, [isFocused]);

  return (
    <View
      className={`${
        themeIs === "light" ? "bg-whiteColor" : "bg-darkPrimary"
      } flex-1`}
    >
      <Flatlist
        data={data}
        themeIs={themeIs}
        flatListRef={flatListRef}
        flatData={flatData}
        currentPage={currentPage}
      />
      <TimelogData
        flatData={flatData}
        handleScrollToTop={handleScrollToTop}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </View>
  );
};

export default Timelog;
