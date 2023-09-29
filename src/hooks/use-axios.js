import axios from "axios";
import { useCallback, useState } from "react";

const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (reqConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        // url
        url: reqConfig.url,
        // method - if method is not provided then it is default to "GET"
        method: reqConfig.method ? reqConfig.method : "GET",
        // headers - if headers is not provided then it is default to object
        headers: reqConfig.headers ? reqConfig.headers : {},
        // body - if post method is used.
        data: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
      });

      if (response.status !== 200) {
        throw new Error("Request failed!");
      }

      // this data should be equal to the data that you gonna get after the request.
      const data = response.data;
      // console.log("THE DATA COMING FROM USE-HTTP HOOK: ", data);
      applyData(data);
    } catch (err) {
      setError("Something went wrong!: ", err);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useAxios;
