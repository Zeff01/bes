// DataContext.js
import { createContext, useContext, useState } from "react";
import { BASE_URL, GET_USER, GET_TIMELOG } from "@env";
import getToken from "../../utils/getToken";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [timelogData, setTimelogData] = useState([]);

  const fetchData = async (requestedURL) => {
    try {
      const token = await getToken();

      const response = await axios.get(`${BASE_URL}${requestedURL}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      // Repeat for other endpoints...
      if (requestedURL === GET_USER) {
        setUserData(data);
      } else if (requestedURL === GET_TIMELOG) {
        setTimelogData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <DataContext.Provider value={{ userData, timelogData, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

// DataContext.js
export const useDataContext = () => {
  const context = useContext(DataContext);
  // console.log("DataContext:", context);

  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }

  return context;
};
