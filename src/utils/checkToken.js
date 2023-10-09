import getToken from "./getToken";
import setupNotifChannel from "./setupNotifChannel";
import getPermission from "./getPermission";

// call this inside useEffect in Home func
const checkToken = async (navigation) => {
  try {
    const token = await getToken();

    if (token) {
      getPermission();
      setupNotifChannel();
    } else {
      navigation.navigate("Login");
    }
  } catch (error) {
    console.error("Error Checking Token: ", error);
  }
};

export default checkToken;
