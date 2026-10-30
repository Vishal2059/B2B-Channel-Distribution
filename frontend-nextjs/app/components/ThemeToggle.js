
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let isDark = false;

    try {
      isDark = localStorage.getItem("leadmarket-theme") === "dark";
    } catch (error) {
      console.error("Could not restore theme:", error);
    }

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark
      ? "dark"
      : "light";

    setDark(isDark);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextDark = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.style.colorScheme = nextDark
      ? "dark"
      : "light";

    setDark(nextDark);

    try {
      localStorage.setItem(
        "leadmarket-theme",
        nextDark ? "dark" : "light"
      );
    } catch (error) {
      console.error("Could not save theme:", error);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white text-xl text-slate-800 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-slate-100 active:scale-95 disabled:cursor-wait dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
    >
      {!mounted ? "◐" : dark ? "☀️" : "🌙"}
    </button>
  );
}
