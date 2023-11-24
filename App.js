import { useEffect } from "react";
import { Notification } from "./src/components/Notification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./src/navigation/navigation";
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";

// import { setupNotification } from "./src/components/notification/setupNotification";

// provider
import ThemeProvider from "./src/store/darkMode/ThemeProvider";
import { DataProvider } from "./src/store/dataContext/DataContext";

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
        <DataProvider>
          <RootApp />
        </DataProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
