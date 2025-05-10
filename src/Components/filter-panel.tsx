"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import {
  setMarketCapRange,
  setPriceRange,
  setVolumeRange,
  toggleTopGainers,
  toggleTopLosers,
  toggleHasMaxSupply,
  resetFilters,
  toggleFilterPanel,
} from "../redux/features/cryptoSlice";
import {
  selectMarketCapRange,
  selectPriceRange,
  selectVolumeRange,
  selectTopGainers,
  selectTopLosers,
  selectHasMaxSupply,
  selectIsFilterPanelOpen,
} from "../redux/selectors";
import { formatCurrency } from "../lib/utils";
import { useTheme } from "../Components/theme/theme-provider";
<<<<<<< HEAD
import { Switch } from "@mui/material";
=======
>>>>>>> d1eacf8b4fae48b045a06de4edf8923455881ad6

interface FilterPanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function FilterPanel({ isOpen, setIsOpen }: FilterPanelProps) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const marketCapRange = useSelector(selectMarketCapRange);
  const priceRange = useSelector(selectPriceRange);
  const volumeRange = useSelector(selectVolumeRange);
  const topGainers = useSelector(selectTopGainers);
  const topLosers = useSelector(selectTopLosers);
  const hasMaxSupply = useSelector(selectHasMaxSupply);
  const isFilterPanelOpen = useSelector(selectIsFilterPanelOpen);

  const [activeTab, setActiveTab] = useState("price");

  const handleMarketCapChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...marketCapRange];
    newValue[index] = Number(e.target.value);
    dispatch(setMarketCapRange(newValue));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...priceRange];
    newValue[index] = Number(e.target.value);
    dispatch(setPriceRange(newValue));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...volumeRange];
    newValue[index] = Number(e.target.value);
    dispatch(setVolumeRange(newValue));
  };

  const handleTopGainersToggle = () => dispatch(toggleTopGainers());
  const handleTopLosersToggle = () => dispatch(toggleTopLosers());
  const handleHasMaxSupplyToggle = () => dispatch(toggleHasMaxSupply());
  const handleResetFilters = () => dispatch(resetFilters());
  const handleClose = () => dispatch(toggleFilterPanel());

  if (!isFilterPanelOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0">
        <div className="inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-background text-left align-middle shadow-xl transition-all sm:my-8">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Filters</h3>
              <p className="text-sm text-muted-foreground">Filter cryptocurrencies by various criteria</p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="mb-4 rounded-lg bg-muted p-1">
              <div className="grid grid-cols-4 gap-1">
                {["price", "marketCap", "volume", "performance"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "price" && "Price"}
                    {tab === "marketCap" && "Market Cap"}
                    {tab === "volume" && "Volume"}
                    {tab === "performance" && "Performance"}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "price" && (
              <PriceSlider priceRange={priceRange} handleChange={handlePriceChange} />
            )}

            {activeTab === "marketCap" && (
              <MarketCapSlider
                marketCapRange={marketCapRange}
                handleChange={handleMarketCapChange}
                hasMaxSupply={hasMaxSupply}
                toggleMaxSupply={handleHasMaxSupplyToggle}
              />
            )}

            {activeTab === "volume" && (
              <VolumeSlider volumeRange={volumeRange} handleChange={handleVolumeChange} />
            )}

            {activeTab === "performance" && (
              <PerformanceFilters
                topGainers={topGainers}
                topLosers={topLosers}
                toggleGainers={handleTopGainersToggle}
                toggleLosers={handleTopLosersToggle}
              />
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={handleResetFilters}
                className="rounded-md border border-input px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent"
              >
                Reset Filters
              </button>
              <button
                onClick={handleClose}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Price Tab
function PriceSlider({ priceRange, handleChange }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-foreground">Price Range</label>
        <span className="text-sm text-muted-foreground">
          {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
        </span>
      </div>
      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="100000"
          step="100"
          value={priceRange[0]}
          onChange={(e) => handleChange(e, 0)}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min="0"
          max="100000"
          step="100"
          value={priceRange[1]}
          onChange={(e) => handleChange(e, 1)}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}

// Market Cap Tab
function MarketCapSlider({ marketCapRange, handleChange, hasMaxSupply, toggleMaxSupply }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-foreground">Market Cap Range</label>
        <span className="text-sm text-muted-foreground">
          {formatCurrency(marketCapRange[0])} - {formatCurrency(marketCapRange[1])}
        </span>
      </div>
      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="2000000000000"
          step="10000000000"
          value={marketCapRange[0]}
          onChange={(e) => handleChange(e, 0)}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min="0"
          max="2000000000000"
          step="10000000000"
          value={marketCapRange[1]}
          onChange={(e) => handleChange(e, 1)}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="has-max-supply" className="text-sm font-medium text-foreground">
          Has Maximum Supply
        </label>
        <Switch id="has-max-supply" checked={hasMaxSupply} onCheckedChange={toggleMaxSupply} />
      </div>
    </div>
  );
}

// Volume Tab
function VolumeSlider({ volumeRange, handleChange }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-foreground">24h Volume Range</label>
        <span className="text-sm text-muted-foreground">
          {formatCurrency(volumeRange[0])} - {formatCurrency(volumeRange[1])}
        </span>
      </div>
      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="50000000000"
          step="1000000000"
          value={volumeRange[0]}
          onChange={(e) => handleChange(e, 0)}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min="0"
          max="50000000000"
          step="1000000000"
          value={volumeRange[1]}
          onChange={(e) => handleChange(e, 1)}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}

// Performance Tab
function PerformanceFilters({ topGainers, topLosers, toggleGainers, toggleLosers }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Top Gainers</label>
        <Switch id="top-gainers" checked={topGainers} onCheckedChange={toggleGainers} />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Top Losers</label>
        <Switch id="top-losers" checked={topLosers} onCheckedChange={toggleLosers} />
      </div>
    </div>
  );
}
