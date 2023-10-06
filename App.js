import { Notification } from "./src/components/Notification";
import Navigation from "./src/navigation/navigation";
import ThemeProvider from "./src/store/darkMode/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      {/* <Notification /> */}
      <Navigation />
    </ThemeProvider>
  );
}
