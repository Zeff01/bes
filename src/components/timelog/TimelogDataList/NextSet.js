import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const NextSet = ({
  pages,
  handleScrollToTop,
  pageNumberLimit,
  minPageNumberLimit,
  maxPageNumberLimit,
  setCurrentPage,
  setMinPageNumberLimit,
  setMaxPageNumberLimit,
}) => {
  const handleNextSet = () => {
    handleScrollToTop(420);
    if (maxPageNumberLimit < pages) {
      setCurrentPage(maxPageNumberLimit + 1);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      if (maxPageNumberLimit + pageNumberLimit < pages) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      } else {
        setMaxPageNumberLimit(pages);
      }
    }
  };

  return (
    <TouchableOpacity
      className="mx-[8] justify-center items-center"
      onPress={handleNextSet}
      disabled={!(maxPageNumberLimit < pages)}
    >
      <FontAwesome
        name="angle-double-right"
        size={30}
        color="#0B646B"
        style={{ opacity: maxPageNumberLimit < pages ? 1 : 0.2 }}
      />
    </TouchableOpacity>
  );
};

export default NextSet;
