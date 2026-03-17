import { createContext, useContext, useEffect, useState } from "react";

const darkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toogleDarkMode() {
    setIsDarkMode((mode) => !mode);
  }

  return (
    <darkModeContext.Provider value={{ isDarkMode, toogleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(darkModeContext);
  if (context === undefined) {
    console.log("darkModeContext was Used outside of Provider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
