"use client" // This directive is crucial for client-side interactivity

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center rounded-full p-2 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:hover:bg-gray-800 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-900"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}