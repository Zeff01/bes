import { Notification } from "./src/components/Notification";
import Navigation from "./src/navigation/navigation";
import ThemeProvider from "./src/store/darkMode/ThemeProvider";
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  const RootApp = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    console.log(isLoggedIn);

    return (
      <ThemeProvider>
        {/* <Notification /> */}
        <Navigation />
      </ThemeProvider>
    );
  }

  
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  )
}
