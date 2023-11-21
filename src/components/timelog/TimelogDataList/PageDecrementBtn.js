import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const PageDecrementBtn = ({
  handleScrollToTop,
  currentPage,
  pageNumberLimit,
  minPageNumberLimit,
  setCurrentPage,
  setMaxPageNumberLimit,
  setMinPageNumberLimit,
}) => {
  
  const handlePrevButton = () => {
    handleScrollToTop(420);
    if (currentPage > 1) {
      if (currentPage === minPageNumberLimit) {
        setCurrentPage(currentPage - 1);
        setMaxPageNumberLimit(minPageNumberLimit - 1);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <TouchableOpacity
      className="mx-[8] justify-center items-center"
      onPress={handlePrevButton}
      disabled={!(currentPage > 1)}
    >
      <FontAwesome
        name={"angle-left"}
        size={30}
        color={"#0B646B"}
        style={{ opacity: currentPage > 1 ? 1 : 0.2 }}
      />
    </TouchableOpacity>
  );
};

export default PageDecrementBtn;
