import React from "react";

const ThemeContext = React.createContext({
  themeIs: null,
  setToggleTheme: () => {},
});

export default ThemeContext;
