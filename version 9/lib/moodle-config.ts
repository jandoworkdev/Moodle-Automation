import type { MoodleConfig } from "./moodle-api"

// Default configuration - should be overridden by environment variables or user settings
export const defaultMoodleConfig: MoodleConfig = {
  url: process.env.NEXT_PUBLIC_MOODLE_URL || "https://your-moodle-site.com",
  token: process.env.NEXT_PUBLIC_MOODLE_TOKEN || "",
  loginMethod: "token",
}

// Configuration validation
export function validateMoodleConfig(config: MoodleConfig): boolean {
  if (!config.url || !config.token) {
    return false
  }

  try {
    new URL(config.url)
    return true
  } catch {
    return false
  }
}

// Get configuration from localStorage or environment
export function getMoodleConfig(): MoodleConfig {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("moodle-config")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return { ...defaultMoodleConfig, ...parsed }
      } catch {
        // Fall back to default if parsing fails
      }
    }
  }

  return defaultMoodleConfig
}

// Save configuration to localStorage
export function saveMoodleConfig(config: MoodleConfig): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("moodle-config", JSON.stringify(config))
  }
}

// Clear stored configuration
export function clearMoodleConfig(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("moodle-config")
  }
}
