import { useState, useEffect } from "react";

// hooks
import useAxios from "../../hooks/use-axios";

// utils
import getToken from "../../utils/getToken";

const getData = (url) => {
  const [data, setData] = useState([]);
  const { isLoading, error, sendRequest } = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const processData = (objData) => {
          if (objData) {
            setData(objData);
          }
        };

        sendRequest(
          {
            url,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
          processData
        );
      } catch (error) {
        console.log("Error in Fetching the data: ", error);
      }
    };

    fetchData();
  }, [url, sendRequest]);

  return { data, isLoading, error };
};

export default getData;
