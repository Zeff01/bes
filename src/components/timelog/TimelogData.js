import React, { useState } from "react";
import { View } from "react-native";
import PrevSet from "./TimelogDataList/PrevSet";
import NextSet from "./TimelogDataList/NextSet";
import PageDecrementBtn from "./TimelogDataList/PageDecrementBtn";
import PageIncrementBtn from "./TimelogDataList/PageIncrementBtn";
import RenderPageNum from "./TimelogDataList/RenderPageNum";

const TimelogData = ({
  handleScrollToTop,
  flatData,
  currentPage,
  setCurrentPage,
}) => {
  const itemsPerPage = 10;
  const pages = Math.ceil(flatData.length / itemsPerPage);
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  return (
    <View className="items-center">
      <View className="absolute bottom-0">
        <View className="flex-row justify-center items-center mt-[35] bg-secondaryColor rounded-full px-[10] mb-[9] h-[60]">
          <PrevSet
            handleScrollToTop={handleScrollToTop}
            pageNumberLimit={pageNumberLimit}
            setCurrentPage={setCurrentPage}
            setMaxPageNumberLimit={setMaxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            setMinPageNumberLimit={setMinPageNumberLimit}
          />
          <PageDecrementBtn
            handleScrollToTop={handleScrollToTop}
            currentPage={currentPage}
            pageNumberLimit={pageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            setCurrentPage={setCurrentPage}
            setMinPageNumberLimit={setMinPageNumberLimit}
            setMaxPageNumberLimit={setMaxPageNumberLimit}
          />
          <RenderPageNum
            handleScrollToTop={handleScrollToTop}
            pages={pages}
            currentPage={currentPage}
            minPageNumberLimit={minPageNumberLimit}
            maxPageNumberLimit={maxPageNumberLimit}
            setCurrentPage={setCurrentPage}
          />
          <PageIncrementBtn
            handleScrollToTop={handleScrollToTop}
            pages={pages}
            currentPage={currentPage}
            maxPageNumberLimit={maxPageNumberLimit}
            setCurrentPage={setCurrentPage}
            setMinPageNumberLimit={setMinPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            pageNumberLimit={pageNumberLimit}
            setMaxPageNumberLimit={setMaxPageNumberLimit}
          />
          <NextSet
            pages={pages}
            handleScrollToTop={handleScrollToTop}
            pageNumberLimit={pageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            maxPageNumberLimit={maxPageNumberLimit}
            setCurrentPage={setCurrentPage}
            setMinPageNumberLimit={setMinPageNumberLimit}
            setMaxPageNumberLimit={setMaxPageNumberLimit}
          />
        </View>
      </View>
    </View>
  );
};

export default TimelogData;
