import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import NavigationRail from "@/components/NavigationRail";
import React, { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // check and reset theme when `darkMode` changes
  useEffect(() => {
    themeCheck();
  }, [darkMode]);

  // check theme on component mount
  useEffect(() => {
    themeCheck();
  }, []);

  // check and reset theme
  const themeCheck = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
  };
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <NavigationRail darkMode={darkMode} setDarkMode={setDarkMode} />
      <Component {...pageProps} />
    </>
  );
}
