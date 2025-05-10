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
import { useTheme } from "./theme/theme-provider";

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

  const handleTopGainersToggle = () => {
    dispatch(toggleTopGainers());
  };

  const handleTopLosersToggle = () => {
    dispatch(toggleTopLosers());
  };

  const handleHasMaxSupplyToggle = () => {
    dispatch(toggleHasMaxSupply());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleClose = () => {
    dispatch(toggleFilterPanel());
  };

  if (!isFilterPanelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0">
        <div className="inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all sm:my-8 dark:bg-background">
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-border">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground">Filters</h3>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">Filter cryptocurrencies by various criteria</p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="mb-4 rounded-lg bg-gray-100 p-1 dark:bg-muted">
              <div className="grid grid-cols-4 gap-1">
                {["price", "marketCap", "volume", "performance"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-sm dark:bg-background dark:text-foreground"
                        : "text-gray-500 hover:text-gray-700 dark:text-muted-foreground dark:hover:text-foreground"
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

            {/* Price Tab */}
            {activeTab === "price" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-foreground">Price Range</label>
                    <span className="text-sm text-gray-500 dark:text-muted-foreground">
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
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-muted"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-muted"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Market Cap Tab */}
            {activeTab === "marketCap" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-foreground">Market Cap Range</label>
                    <span className="text-sm text-gray-500 dark:text-muted-foreground">
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
                      onChange={(e) => handleMarketCapChange(e, 0)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-muted"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000000000000"
                      step="10000000000"
                      value={marketCapRange[1]}
                      onChange={(e) => handleMarketCapChange(e, 1)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-muted"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="has-max-supply" className="text-sm font-medium text-gray-700 dark:text-foreground">
                    Has Maximum Supply
                  </label>
                  <Switch
                    id="has-max-supply"
                    checked={hasMaxSupply}
                    onCheckedChange={handleHasMaxSupplyToggle}
                  />
                </div>
              </div>
            )}

            {/* Volume Tab */}
            {activeTab === "volume" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-foreground">24h Volume Range</label>
                    <span className="text-sm text-gray-500 dark:text-muted-foreground">
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
                      onChange={(e) => handleVolumeChange(e, 0)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-muted"
                    />
                    <input
                      type="range"
                      min="0"
                      max="50000000000"
                      step="1000000000"
                      value={volumeRange[1]}
                      onChange={(e) => handleVolumeChange(e, 1)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-muted"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === "performance" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="top-gainers" className="text-sm font-medium text-gray-700 dark:text-foreground">
                    Top Gainers (24h)
                  </label>
                  <Switch
                    id="top-gainers"
                    checked={topGainers}
                    onCheckedChange={handleTopGainersToggle}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="top-losers" className="text-sm font-medium text-gray-700 dark:text-foreground">
                    Top Losers (24h)
                  </label>
                  <Switch
                    id="top-losers"
                    checked={topLosers}
                    onCheckedChange={handleTopLosersToggle}
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={handleResetFilters}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-input dark:text-foreground dark:hover:bg-accent"
              >
                Reset Filters
              </button>
              <button
                onClick={handleClose}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
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

function Switch({
  id,
  checked,
  onCheckedChange,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}