"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ThemeSelector({ className = "" }) {
  const { currentTheme, themeOptions, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  type ThemeName = keyof typeof themeOptions;
  const themes = Object.keys(themeOptions) as ThemeName[];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      if (!target) return;

      if (
        toggleRef.current &&
        !toggleRef.current.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      const shouldOpenUpward =
        window.innerHeight - rect.bottom < 300 && rect.top > 300;
      setOpenUpward(shouldOpenUpward);
    }
  }, [isOpen]);

  return (
    <div className={`language-selector ${className}`} ref={toggleRef}>
      <div className="language-toggle" onClick={toggleDropdown}>
        <span className="text-sm">{currentTheme.toUpperCase()}</span>
        <ChevronDown
          className={`text-xs transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`language-dropdown ${openUpward ? "upward" : "downward"}`}
        >
          {themes.map((name) => (
            <div
              key={name}
              className={`language-option ${
                name === currentTheme ? "active" : ""
              }`}
              onClick={() => changeTheme(name)}
            >
              <span>{name.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
