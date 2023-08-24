import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseURL = "http://bes.outposter.com.au/api/auth/user"

export async function api_get_user({token}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
      },
  };
  const res = await axios.get(`${baseURL}/api/auth/user`, config)
  const data = await res.data
  return data
}