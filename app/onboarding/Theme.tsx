"use client";

import { useState } from "react";
import { themeOptions } from "../data/theme";
import { ThemeName, useTheme } from "../context/ThemeContext";
import { Theme } from "../types/theme";
import Button from "../components/ui/button";
import { useSetParams } from "../hooks/useSetParams";

export default function ThemePage() {
  const { currentTheme, changeTheme } = useTheme();

  // Initialize with current theme from context
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(currentTheme);

  const handleSelect = (themeName: ThemeName) => {
    setSelectedTheme(themeName);
    changeTheme(themeName);
  };
  const { setParams } = useSetParams();
  return (
    <div className="min-h-screen p-2 relative">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          Choose Your Theme
        </h1>
        <p className="text-md md:text-xl opacity-90 max-w-2xl mx-auto">
          Pick a vibe that matches your style and personality!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {Object.entries(themeOptions).map(([key, theme]) => {
          const themeKey = key as ThemeName;
          const isSelected = selectedTheme === themeKey;

          return (
            <ThemeCard
              key={themeKey}
              theme={theme}
              themeName={themeKey}
              isSelected={isSelected}
              onSelect={handleSelect}
            />
          );
        })}
      </div>

      <Button onClick={() => setParams({ step: 4 })} fullWidth>
        Next{" "}
      </Button>
    </div>
  );
}

// Reusable Theme Card Component
interface ThemeCardProps {
  theme: Theme;
  themeName: ThemeName;
  isSelected: boolean;
  onSelect: (themeName: ThemeName) => void;
}

function ThemeCard({ theme, themeName, isSelected, onSelect }: ThemeCardProps) {
  return (
    <div
      onClick={() => onSelect(themeName)}
      className={`
        cursor-pointer rounded-2xl p-1.5 shadow-xl transition-all duration-300 
        hover:shadow-2xl hover:-translate-y-2 group
        ${
          isSelected
            ? "ring-4 ring-primary-400/30 shadow-primary-500/25"
            : "hover:ring-2 hover:ring-white/20"
        }
      `}
      style={{
        background: `linear-gradient(145deg, ${theme.palette.gradients.dark}, ${theme.palette.gradients.blue})`,
        border: isSelected ? `2px solid ${theme.primaryColor}` : "none",
      }}
    >
      {/* Theme Preview Swatch */}
      <div
        className="w-full h-20 md:h-24 mb-4 rounded-xl overflow-hidden relative"
        style={{
          background: `linear-gradient(45deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
        <div
          className="absolute top-2 right-2 w-3 h-3 rounded-full"
          style={{ backgroundColor: theme.accentColor }}
        />
      </div>

      {/* Theme Name */}
      <h2 className="text-lg md:text-xl font-bold text-center mb-3 group-hover:text-primary-200 transition-colors">
        {theme.name}
      </h2>
    </div>
  );
}
