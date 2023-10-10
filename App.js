import { Notification } from "./src/components/Notification";
import Navigation from "./src/navigation/navigation";
import ThemeProvider from "./src/store/darkMode/ThemeProvider";
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  const RootApp = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const token = useSelector((state) => state.auth.authToken);
    console.log('Login @App.js ' + isLoggedIn);
    console.log('Token @App.js ' + token);

    return (
      <Provider store={store}>
        <ThemeProvider>
          {/* <Notification /> */}
          <Navigation />
        </ThemeProvider>
      </Provider>

    );
  }

  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  )
}
