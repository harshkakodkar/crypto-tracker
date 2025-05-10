import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Crypto } from "../../types/crypto"
import { generateRandomChartData, getRandomPrice, getRandomPercentage, getRandomVolume } from "../../lib/utils"

// Sample crypto data with logo URLs
const initialCryptos: Crypto[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 65432.1,
    change1h: 0.5,
    change24h: 2.3,
    change7d: 5.7,
    marketCap: 1258000000000,
    volume24h: 28500000000,
    circulatingSupply: 19500000,
    maxSupply: 21000000,
    chartData: generateRandomChartData(7, 60000, 70000),
    category: "currency",
    logo: "/images/crypto/bitcoin.png"
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3456.78,
    change1h: -0.2,
    change24h: 1.5,
    change7d: -2.1,
    marketCap: 415000000000,
    volume24h: 15700000000,
    circulatingSupply: 120000000,
    maxSupply: null,
    chartData: generateRandomChartData(7, 3000, 3800),
    category: "platform",
    logo: "/images/crypto/ethereum.png"
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    change1h: 0.01,
    change24h: -0.02,
    change7d: 0.05,
    marketCap: 95000000000,
    volume24h: 42000000000,
    circulatingSupply: 95000000000,
    maxSupply: null,
    chartData: generateRandomChartData(7, 0.99, 1.01),
    category: "stablecoin",
    logo: "/images/crypto/tether.png"
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    price: 567.89,
    change1h: 0.8,
    change24h: -1.2,
    change7d: 3.4,
    marketCap: 85000000000,
    volume24h: 2100000000,
    circulatingSupply: 150000000,
    maxSupply: 200000000,
    chartData: generateRandomChartData(7, 520, 600),
    category: "exchange",
    logo: "/images/crypto/bnb.png"
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 123.45,
    change1h: 1.2,
    change24h: 4.5,
    change7d: -3.2,
    marketCap: 54000000000,
    volume24h: 2800000000,
    circulatingSupply: 440000000,
    maxSupply: null,
    chartData: generateRandomChartData(7, 110, 140),
    category: "platform",
    logo: "/images/crypto/solana.png"
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.45,
    change1h: -0.3,
    change24h: -2.1,
    change7d: -5.4,
    marketCap: 16000000000,
    volume24h: 450000000,
    circulatingSupply: 35600000000,
    maxSupply: 45000000000,
    chartData: generateRandomChartData(7, 0.42, 0.48),
    category: "platform",
    logo: "/images/crypto/cardano.png"
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    price: 0.56,
    change1h: 0.7,
    change24h: -0.9,
    change7d: 1.2,
    marketCap: 30500000000,
    volume24h: 1200000000,
    circulatingSupply: 54500000000,
    maxSupply: 100000000000,
    chartData: generateRandomChartData(7, 0.52, 0.58),
    category: "currency",
    logo: "/images/crypto/xrp.png"
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.12,
    change1h: 1.5,
    change24h: 8.2,
    change7d: 12.5,
    marketCap: 17000000000,
    volume24h: 1800000000,
    circulatingSupply: 140000000000,
    maxSupply: null,
    chartData: generateRandomChartData(7, 0.1, 0.14),
    category: "meme",
    logo: "/images/crypto/dogecoin.png"
  },
]

interface CryptoState {
  cryptos: Crypto[]
  sortConfig: {
    key: string
    direction: "asc" | "desc"
  }
  searchTerm: string
  filters: {
    marketCapRange: number[]
    priceRange: number[]
    volumeRange: number[]
    topGainers: boolean
    topLosers: boolean
    hasMaxSupply: boolean
  }
  isFilterPanelOpen: boolean
}

const initialState: CryptoState = {
  cryptos: initialCryptos,
  sortConfig: {
    key: "marketCap",
    direction: "desc",
  },
  searchTerm: "",
  filters: {
    marketCapRange: [0, 2000000000000],
    priceRange: [0, 100000],
    volumeRange: [0, 50000000000],
    topGainers: false,
    topLosers: false,
    hasMaxSupply: false,
  },
  isFilterPanelOpen: false,
}

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrices: (state) => {
      state.cryptos = state.cryptos.map((crypto) => {
        const newPrice = getRandomPrice(crypto.price)
        return {
          ...crypto,
          price: newPrice,
          change1h: getRandomPercentage(crypto.change1h),
          change24h: getRandomPercentage(crypto.change24h),
          change7d: getRandomPercentage(crypto.change7d),
          volume24h: getRandomVolume(crypto.volume24h),
          chartData: [...crypto.chartData.slice(1), newPrice],
        }
      })
    },
    setSortConfig: (state, action: PayloadAction<{ key: string; direction: "asc" | "desc" }>) => {
      state.sortConfig = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setMarketCapRange: (state, action: PayloadAction<number[]>) => {
      state.filters.marketCapRange = action.payload
    },
    resetMarketCapRange: (state) => {
      state.filters.marketCapRange = initialState.filters.marketCapRange
    },
    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.filters.priceRange = action.payload
    },
    resetPriceRange: (state) => {
      state.filters.priceRange = initialState.filters.priceRange
    },
    setVolumeRange: (state, action: PayloadAction<number[]>) => {
      state.filters.volumeRange = action.payload
    },
    resetVolumeRange: (state) => {
      state.filters.volumeRange = initialState.filters.volumeRange
    },
    toggleTopGainers: (state) => {
      state.filters.topGainers = !state.filters.topGainers
      if (state.filters.topGainers) {
        state.filters.topLosers = false
      }
    },
    toggleTopLosers: (state) => {
      state.filters.topLosers = !state.filters.topLosers
      if (state.filters.topLosers) {
        state.filters.topGainers = false
      }
    },
    toggleHasMaxSupply: (state) => {
      state.filters.hasMaxSupply = !state.filters.hasMaxSupply
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    toggleFilterPanel: (state) => {
      state.isFilterPanelOpen = !state.isFilterPanelOpen
    },
  },
})

export const {
  updateCryptoPrices,
  setSortConfig,
  setSearchTerm,
  setMarketCapRange,
  resetMarketCapRange,
  setPriceRange,
  resetPriceRange,
  setVolumeRange,
  resetVolumeRange,
  toggleTopGainers,
  toggleTopLosers,
  toggleHasMaxSupply,
  resetFilters,
  toggleFilterPanel,
} = cryptoSlice.actions

export default cryptoSlice.reducer
