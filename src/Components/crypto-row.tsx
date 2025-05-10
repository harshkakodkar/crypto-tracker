"use client"

import { useEffect, useRef, useState } from "react"
import { formatCurrency, formatNumber, formatPercentage } from "../lib/utils"
import type { Crypto } from "../types/crypto"
import MiniChart from "./mini-chart"
import { useTheme } from "./theme/theme-provider"

// Define Theme type for better TypeScript support
type Theme = "light" | "dark" | "system"

interface CryptoRowProps {
  crypto: Crypto
  index: number
}

export default function CryptoRow({ crypto, index }: CryptoRowProps) {
  const { theme } = useTheme()
  const [priceFlash, setPriceFlash] = useState<"none" | "increase" | "decrease">("none")
  const [imgError, setImgError] = useState(false)
  const prevPriceRef = useRef(crypto.price)

  // Local logo paths mapped by symbol
  const localLogos: Record<string, string> = {
    BTC: '/images/crypto/bitcoin.png',
    ETH: '/images/crypto/ethereum.png',
    USDT: '/images/crypto/tether.png',
    BNB: '/images/crypto/bnb.png',
    SOL: '/images/crypto/solana.png',
    ADA: '/images/crypto/cardano.png',
    XRP: '/images/crypto/xrp.png',
    DOGE: '/images/crypto/dogecoin.png'
  }

  // Get the appropriate image source with fallbacks
  const getLogoSrc = () => {
    if (imgError) {
      return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><rect width='32' height='32' fill='${theme === 'dark' ? '%232d3748' : '%23f3f4f6'}' rx='16'/><text x='50%' y='50%' fill='${theme === 'dark' ? '%239ca3af' : '%236b7280'}' font-family='sans-serif' font-size='12' font-weight='500' text-anchor='middle' dy='.3em'>${crypto.symbol.slice(0, 3)}</text></svg>`
    }
    return localLogos[crypto.symbol] || `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><rect width='32' height='32' fill='${theme === 'dark' ? '%232d3748' : '%23f3f4f6'}' rx='16'/><text x='50%' y='50%' fill='${theme === 'dark' ? '%239ca3af' : '%236b7280'}' font-family='sans-serif' font-size='12' font-weight='500' text-anchor='middle' dy='.3em'>${crypto.symbol.slice(0, 3)}</text></svg>`
  }

  useEffect(() => {
    if (crypto.price > prevPriceRef.current) {
      setPriceFlash("increase")
    } else if (crypto.price < prevPriceRef.current) {
      setPriceFlash("decrease")
    }

    prevPriceRef.current = crypto.price

    const timer = setTimeout(() => {
      setPriceFlash("none")
    }, 1000)

    return () => clearTimeout(timer)
  }, [crypto.price])

  const getPriceClassName = () => {
    if (priceFlash === "increase") return "price-increase"
    if (priceFlash === "decrease") return "price-decrease"
    return ""
  }

  const getPercentageClassName = (value: number) => {
    return value >= 0 ? "text-positive" : "text-negative"
  }

  return (
    <tr className="border-b border-border hover:bg-muted/50 transition-colors">
      <td className="p-4 text-muted-foreground text-center">{index}</td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-muted">
            <img
              src={getLogoSrc()}
              alt={`${crypto.name} logo`}
              className="w-full h-full object-contain p-1"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">{crypto.name}</div>
            <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
          </div>
        </div>
      </td>
      <td className={`p-4 text-right font-medium ${getPriceClassName()}`}>
        {formatCurrency(crypto.price)}
      </td>
      <td className={`p-4 text-right ${getPercentageClassName(crypto.change1h)}`}>
        {formatPercentage(crypto.change1h)}
      </td>
      <td className={`p-4 text-right ${getPercentageClassName(crypto.change24h)}`}>
        {formatPercentage(crypto.change24h)}
      </td>
      <td className={`p-4 text-right ${getPercentageClassName(crypto.change7d)}`}>
        {formatPercentage(crypto.change7d)}
      </td>
      <td className="p-4 text-right">{formatCurrency(crypto.marketCap)}</td>
      <td className="p-4 text-right">{formatCurrency(crypto.volume24h)}</td>
      <td className="p-4 text-right">
        <div className="flex flex-col items-end">
          <span>
            {formatNumber(crypto.circulatingSupply)} {crypto.symbol}
          </span>
          {crypto.maxSupply && (
            <div className="w-full mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${(crypto.circulatingSupply / crypto.maxSupply) * 100}%` }}
              />
            </div>
          )}
        </div>
      </td>
      <td className="p-4">
        <MiniChart
          data={crypto.chartData}
          change7d={crypto.change7d}
          theme={theme}  // Pass the theme prop here
        />
      </td>
    </tr>
  )
}
