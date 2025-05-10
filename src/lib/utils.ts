import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency with appropriate abbreviations for large numbers
export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`
  } else if (value >= 1) {
    return `$${value.toFixed(2)}`
  } else {
    return `$${value.toFixed(6)}`
  }
}

// Format percentage with + or - sign
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

// Format large numbers with appropriate abbreviations
export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`
  } else {
    return value.toFixed(0)
  }
}

// Generate random price change (±0.1% to ±1%)
export function getRandomPrice(currentPrice: number): number {
  const changePercent = (Math.random() * 2 - 1) * 0.01 // -1% to +1%
  const newPrice = currentPrice * (1 + changePercent)
  return Math.max(newPrice, 0.000001) // Ensure price doesn't go below a minimum value
}

// Generate random percentage change (±0.1% to ±0.5% from current)
export function getRandomPercentage(currentPercentage: number): number {
  const change = (Math.random() * 1 - 0.5) * 0.5 // -0.25% to +0.25%
  return currentPercentage + change
}

// Generate random volume change (±1% to ±5%)
export function getRandomVolume(currentVolume: number): number {
  const changePercent = (Math.random() * 10 - 5) * 0.01 // -5% to +5%
  return currentVolume * (1 + changePercent)
}

// Generate random chart data
export function generateRandomChartData(days: number, min: number, max: number): number[] {
  const data: number[] = []
  let currentValue = min + Math.random() * (max - min)

  for (let i = 0; i < days; i++) {
    // Add some volatility
    const volatility = (max - min) * 0.05 // 5% of the range
    const change = (Math.random() * 2 - 1) * volatility

    currentValue = Math.max(min, Math.min(max, currentValue + change))
    data.push(currentValue)
  }

  return data
}
