"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dopamine" | "cool-blue";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "cryptoflow-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("cool-blue");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (stored === "dopamine" || stored === "cool-blue") {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      document.documentElement.setAttribute("data-theme", theme);
      document.body.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "cool-blue" ? "dopamine" : "cool-blue"));
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
