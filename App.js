import { Notification } from "./src/components/Notification";
import Navigation from "./src/navigation/navigation";
import ThemeProvider from "./src/store/darkMode/ThemeProvider";
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const RootApp = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const token = useSelector((state) => state.auth.authToken);

    return (
      <Provider store={store}>
        <ThemeProvider>
          {/* <Notification /> */}
          <Navigation />
        </ThemeProvider>
      </Provider>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <RootApp />
      </Provider>
    </GestureHandlerRootView>
  );
}
