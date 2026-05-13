import { useContext } from "react";

import ThemeContext from "./ThemeContext.js";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;