import { useDispatch, useSelector } from "react-redux"
import { X } from "lucide-react"
import {
  resetMarketCapRange,
  resetPriceRange,
  resetVolumeRange,
  toggleTopGainers,
  toggleTopLosers,
  toggleHasMaxSupply,
} from "../redux/features/cryptoSlice"
import { selectActiveFilters } from "../redux/selectors"
import { formatCurrency } from "../lib/utils"

export default function FilterBadges() {
  const dispatch = useDispatch()
  const activeFilters = useSelector(selectActiveFilters)

  return (
    <div className="flex flex-wrap gap-2">
      {activeFilters.price.active && (
        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
          <span>
            Price: {formatCurrency(activeFilters.price.min)} - {formatCurrency(activeFilters.price.max)}
          </span>
          <X 
            className="h-3 w-3 cursor-pointer hover:text-gray-500" 
            onClick={() => dispatch(resetPriceRange())} 
          />
        </div>
      )}

      {activeFilters.marketCap.active && (
        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
          <span>
            Market Cap: {formatCurrency(activeFilters.marketCap.min)} - {formatCurrency(activeFilters.marketCap.max)}
          </span>
          <X 
            className="h-3 w-3 cursor-pointer hover:text-gray-500" 
            onClick={() => dispatch(resetMarketCapRange())} 
          />
        </div>
      )}

      {activeFilters.volume.active && (
        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
          <span>
            Volume: {formatCurrency(activeFilters.volume.min)} - {formatCurrency(activeFilters.volume.max)}
          </span>
          <X 
            className="h-3 w-3 cursor-pointer hover:text-gray-500" 
            onClick={() => dispatch(resetVolumeRange())} 
          />
        </div>
      )}

      {activeFilters.topGainers && (
        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
          <span>Top Gainers</span>
          <X 
            className="h-3 w-3 cursor-pointer hover:text-gray-500" 
            onClick={() => dispatch(toggleTopGainers())} 
          />
        </div>
      )}

      {activeFilters.topLosers && (
        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
          <span>Top Losers</span>
          <X 
            className="h-3 w-3 cursor-pointer hover:text-gray-500" 
            onClick={() => dispatch(toggleTopLosers())} 
          />
        </div>
      )}

      {activeFilters.hasMaxSupply && (
        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
          <span>Has Max Supply</span>
          <X 
            className="h-3 w-3 cursor-pointer hover:text-gray-500" 
            onClick={() => dispatch(toggleHasMaxSupply())} 
          />
        </div>
      )}
    </div>
  )
}