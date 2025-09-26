"use client";

import { ReactNode, useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { themeOptions } from "../data/theme";
import { Theme } from "../types/theme";
import { useAppKitTheme } from "@reown/appkit/react";

export type ThemeName = keyof typeof themeOptions;

interface ThemeContextType {
  currentTheme: ThemeName;
  theme: Theme;
  themeOptions: Record<ThemeName, Theme>;
  changeTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("default");
  const { setThemeVariables } = useAppKitTheme();

  useEffect(() => {
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (savedTheme && themeOptions[savedTheme as ThemeName]) {
      setCurrentTheme(savedTheme as ThemeName);
    }
  }, []);
  const theme = themeOptions[currentTheme] || themeOptions.default;

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", currentTheme);
    }

    const setCSSVar = (key: string, value: string) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    };

    // Base colors
    setCSSVar("primary-color", theme.primaryColor);
    setThemeVariables({
      "--w3m-color-mix": theme.secondaryColor,
      "--w3m-color-mix-strength": 10,
    });
    setCSSVar("secondary-color", theme.secondaryColor);
    setCSSVar("accent-color", theme.accentColor);
    setCSSVar("dark-bg", theme.darkBg);
    setCSSVar("darker-bg", theme.darkerBg);
    setCSSVar("light-text", theme.lightText);
    setCSSVar("glass-opacity", String(theme.glassOpacity));

    // Primary shades
    Object.entries(theme.palette.primary).forEach(([k, v]) => {
      setCSSVar(`primary-${k}`, v);
    });

    // Secondary shades
    Object.entries(theme.palette.secondary).forEach(([k, v]) => {
      setCSSVar(`secondary-${k}`, v);
    });

    // Neutral colors
    Object.entries(theme.palette.neutral).forEach(([k, v]) => {
      setCSSVar(k === "light" ? "light" : k, v);
    });

    // Glass effects
    Object.entries(theme.palette.glass).forEach(([k, v]) => {
      setCSSVar(`glass-${k}`, v);
    });

    // Gradients
    Object.entries(theme.palette.gradients).forEach(([k, v]) => {
      setCSSVar(`gradient-${k}`, v);
    });

    // Transitions
    Object.entries(theme.palette.transition).forEach(([k, v]) => {
      setCSSVar(`transition-${k}`, v);
    });
  }, [currentTheme, theme]);

  const changeTheme = (themeName: ThemeName) => {
    if (themeOptions[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    theme,
    themeOptions,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
