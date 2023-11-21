import { createContext } from "react";

const ThemeContext = createContext({
  themeIs: null,
  setToggleTheme: () => {},
});

export default ThemeContext;
