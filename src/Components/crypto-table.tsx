import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ArrowDown, ArrowUp, Search, SlidersHorizontal } from "lucide-react"
import { selectFilteredCryptos, selectSortConfig, selectActiveFilters } from "../redux/selectors"
import { updateCryptoPrices, setSortConfig, setSearchTerm, toggleFilterPanel } from "../redux/features/cryptoSlice"
import CryptoRow from "./crypto-row"
import { TableSkeleton } from "./table-skeleton"
import FilterBadges from "./filter-badges"
import { useTheme } from "./theme/theme-provider"

export default function CryptoTable() {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const cryptos = useSelector(selectFilteredCryptos)
  const sortConfig = useSelector(selectSortConfig)
  const activeFilters = useSelector(selectActiveFilters)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    const interval = setInterval(() => {
      dispatch(updateCryptoPrices())
    }, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(loadingTimer)
    }
  }, [dispatch])

  const handleSort = (key: string) => {
    dispatch(
      setSortConfig({
        key,
        direction: sortConfig.key === key ? (sortConfig.direction === "asc" ? "desc" : "asc") : "asc",
      }),
    )
  }

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const toggleFilters = () => {
    dispatch(toggleFilterPanel())
  }

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or symbol..."
            className="w-full pl-8 pr-3 py-2 border rounded-md bg-background text-foreground text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={handleSearch}
          />
        </div>
        <button
          onClick={toggleFilters}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-md bg-background text-sm font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {Object.values(activeFilters).some((filter) => filter.active) && <FilterBadges />}

      <div className="rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[60px]">#</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[180px]">
                  <button 
                    onClick={() => handleSort("name")} 
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Name {getSortIcon("name")}
                  </button>
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground min-w-[120px]">
                  <button
                    onClick={() => handleSort("price")}
                    className="flex items-center gap-1 justify-end hover:text-foreground ml-auto"
                  >
                    Price {getSortIcon("price")}
                  </button>
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground min-w-[100px]">
                  <button
                    onClick={() => handleSort("change1h")}
                    className="flex items-center gap-1 justify-end hover:text-foreground ml-auto"
                  >
                    1h % {getSortIcon("change1h")}
                  </button>
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground min-w-[100px]">
                  <button
                    onClick={() => handleSort("change24h")}
                    className="flex items-center gap-1 justify-end hover:text-foreground ml-auto"
                  >
                    24h % {getSortIcon("change24h")}
                  </button>
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground min-w-[100px]">
                  <button
                    onClick={() => handleSort("change7d")}
                    className="flex items-center gap-1 justify-end hover:text-foreground ml-auto"
                  >
                    7d % {getSortIcon("change7d")}
                  </button>
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground min-w-[150px]">
                  <button
                    onClick={() => handleSort("marketCap")}
                    className="flex items-center gap-1 justify-end hover:text-foreground ml-auto"
                  >
                    Market Cap {getSortIcon("marketCap")}
                  </button>
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground min-w-[150px]">
                  <button
                    onClick={() => handleSort("volume24h")}
                    className="flex items-center gap-1 justify-end hover:text-foreground ml-auto"
                  >
                    Volume (24h) {getSortIcon("volume24h")}
                  </button>
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground min-w-[180px]">
                  <button
                    onClick={() => handleSort("circulatingSupply")}
                    className="flex items-center gap-1 justify-end hover:text-foreground ml-auto"
                  >
                    Circulating Supply {getSortIcon("circulatingSupply")}
                  </button>
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground min-w-[120px]">
                  <span className="flex items-center gap-1 justify-end">7D Chart</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cryptos.length > 0 ? (
                cryptos.map((crypto, index) => <CryptoRow key={crypto.id} crypto={crypto} index={index + 1} />)
              ) : (
                <tr>
                  <td colSpan={10} className="p-4 text-center text-muted-foreground">
                    No cryptocurrencies match your filters. Try adjusting your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}