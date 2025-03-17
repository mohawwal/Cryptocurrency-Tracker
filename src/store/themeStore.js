import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const storageKey = "vite-ui-theme";
  const defaultTheme = "system";

  // Load theme from localStorage or use default
  const theme = ref(localStorage.getItem(storageKey) || defaultTheme);

  const setTheme = (newTheme) => {
    localStorage.setItem(storageKey, newTheme);
    theme.value = newTheme;
    updateTheme(newTheme);
  };

  const updateTheme = (theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  };

  // Apply the theme when it changes
  watchEffect(() => {
    updateTheme(theme.value);
  });

  return { theme, setTheme };
});
