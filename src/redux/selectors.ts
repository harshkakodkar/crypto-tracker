import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "./store"

// Select all cryptos
export const selectCryptos = (state: RootState) => state.crypto.cryptos

// Select sort config
export const selectSortConfig = (state: RootState) => state.crypto.sortConfig

// Select search term
export const selectSearchTerm = (state: RootState) => state.crypto.searchTerm

// Select filters
export const selectMarketCapRange = (state: RootState) => state.crypto.filters.marketCapRange
export const selectPriceRange = (state: RootState) => state.crypto.filters.priceRange
export const selectVolumeRange = (state: RootState) => state.crypto.filters.volumeRange
export const selectTopGainers = (state: RootState) => state.crypto.filters.topGainers
export const selectTopLosers = (state: RootState) => state.crypto.filters.topLosers
export const selectHasMaxSupply = (state: RootState) => state.crypto.filters.hasMaxSupply
export const selectIsFilterPanelOpen = (state: RootState) => state.crypto.isFilterPanelOpen

// Select active filters for UI display
export const selectActiveFilters = createSelector(
  [selectMarketCapRange, selectPriceRange, selectVolumeRange, selectTopGainers, selectTopLosers, selectHasMaxSupply],
  (marketCapRange, priceRange, volumeRange, topGainers, topLosers, hasMaxSupply) => {
    const initialMarketCapRange = [0, 2000000000000]
    const initialPriceRange = [0, 100000]
    const initialVolumeRange = [0, 50000000000]

    return {
      marketCap: {
        active: marketCapRange[0] !== initialMarketCapRange[0] || marketCapRange[1] !== initialMarketCapRange[1],
        min: marketCapRange[0],
        max: marketCapRange[1],
      },
      price: {
        active: priceRange[0] !== initialPriceRange[0] || priceRange[1] !== initialPriceRange[1],
        min: priceRange[0],
        max: priceRange[1],
      },
      volume: {
        active: volumeRange[0] !== initialVolumeRange[0] || volumeRange[1] !== initialVolumeRange[1],
        min: volumeRange[0],
        max: volumeRange[1],
      },
      topGainers,
      topLosers,
      hasMaxSupply,
    }
  },
)

// Select filtered and sorted cryptos
export const selectFilteredCryptos = createSelector(
  [
    selectCryptos,
    selectSortConfig,
    selectSearchTerm,
    selectMarketCapRange,
    selectPriceRange,
    selectVolumeRange,
    selectTopGainers,
    selectTopLosers,
    selectHasMaxSupply,
  ],
  (cryptos, sortConfig, searchTerm, marketCapRange, priceRange, volumeRange, topGainers, topLosers, hasMaxSupply) => {
    // First apply all filters
    let filteredCryptos = cryptos.filter((crypto) => {
      // Market cap filter
      if (crypto.marketCap < marketCapRange[0] || crypto.marketCap > marketCapRange[1]) {
        return false
      }

      // Price filter
      if (crypto.price < priceRange[0] || crypto.price > priceRange[1]) {
        return false
      }

      // Volume filter
      if (crypto.volume24h < volumeRange[0] || crypto.volume24h > volumeRange[1]) {
        return false
      }

      // Has max supply filter
      if (hasMaxSupply && crypto.maxSupply === null) {
        return false
      }

      return true
    })

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filteredCryptos = filteredCryptos.filter(
        (crypto) => crypto.name.toLowerCase().includes(term) || crypto.symbol.toLowerCase().includes(term),
      )
    }

    // Apply top gainers/losers filters
    if (topGainers) {
      // Sort by 24h change descending and take top 5
      filteredCryptos = [...filteredCryptos].sort((a, b) => b.change24h - a.change24h).slice(0, 5)
    } else if (topLosers) {
      // Sort by 24h change ascending and take top 5
      filteredCryptos = [...filteredCryptos].sort((a, b) => a.change24h - b.change24h).slice(0, 5)
    }

    // Then sort by the selected sort config
    return [...filteredCryptos].sort((a, b) => {
      const key = sortConfig.key as keyof typeof a

      // Handle different data types
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return sortConfig.direction === "asc"
          ? (a[key] as number) - (b[key] as number)
          : (b[key] as number) - (a[key] as number)
      }

      // Handle string comparison
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return sortConfig.direction === "asc"
          ? (a[key] as string).localeCompare(b[key] as string)
          : (b[key] as string).localeCompare(a[key] as string)
      }

      return 0
    })
  },
)
