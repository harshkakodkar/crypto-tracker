"use client"

import { useState } from "react"
import CryptoTable from "./crypto-table"
import FilterPanel from "./filter-panel"
import { ThemeToggle } from "./theme/theme-toggle"

export default function CryptoTracker() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-2">
        <ThemeToggle />
      </div>
      <FilterPanel isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
      <CryptoTable />
    </div>
  )
}
