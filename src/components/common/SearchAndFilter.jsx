import React, { useState } from "react";
import SearchIcon from "components/icons/SearchIcon";
import { 
  MdFilterList, 
  MdExpandMore, 
  MdExpandLess, 
  MdClear 
} from "react-icons/md";

const SearchAndFilter = ({
  searchValue = "",
  onSearchChange,
  placeholder = "Search...",
  enableAdvancedFilters = true,
  advancedFilters = {},
  onAdvancedFilterChange,
  onClearFilters,
  filterConfig = []
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleFilterChange = (field, value) => {
    onAdvancedFilterChange(field, value);
  };

  const clearAdvancedFilters = () => {
    onClearFilters();
  };

  const getActiveFiltersCount = () => {
    return Object.values(advancedFilters).filter(value => value && value !== "").length;
  };

  return (
    <div className="w-full">
      {/* Search and Filter Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <div className="flex h-[38px] w-full items-center rounded-xl bg-lightPrimary text-sm text-gray-600 dark:!bg-navy-900 dark:text-white">
            <SearchIcon />
            <input
              value={searchValue}
              onChange={handleInputChange}
              type="text"
              placeholder={placeholder}
              className="block w-full rounded-full bg-lightPrimary text-base text-navy-700 outline-none dark:!bg-navy-900 dark:text-white px-3"
            />
          </div>
        </div>
        
        {/* Filter Toggle Button */}
        {enableAdvancedFilters && filterConfig.length > 0 && (
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-navy-700 dark:hover:bg-navy-600 text-gray-700 dark:text-white rounded-lg transition-all duration-200 whitespace-nowrap"
            title="Advanced Filters"
          >
            <MdFilterList className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Filters</span>
            {showAdvancedFilters ? <MdExpandLess className="w-4 h-4" /> : <MdExpandMore className="w-4 h-4" />}
            {getActiveFiltersCount() > 0 && (
              <span className="bg-brand-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && filterConfig.length > 0 && (
        <div className="mb-4 p-4 sm:p-6 bg-white/50 dark:bg-navy-800/30 rounded-xl border border-gray-100 dark:border-navy-700 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filterConfig.map((filter, index) => (
              <div key={index} className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  {filter.label}
                </label>
                {filter.type === 'select' ? (
                  <select
                    value={advancedFilters[filter.field] || ""}
                    onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                  >
                    <option value="">{filter.placeholder || `All ${filter.label}`}</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : filter.type === 'date' ? (
                  <input
                    type="date"
                    value={advancedFilters[filter.field] || ""}
                    onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800"
                  />
                ) : filter.type === 'number' ? (
                  <input
                    type="number"
                    value={advancedFilters[filter.field] || ""}
                    onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                    placeholder={filter.placeholder || "0"}
                    min={filter.min || 0}
                    step={filter.step || "0.01"}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={advancedFilters[filter.field] || ""}
                    onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                    placeholder={filter.placeholder || ""}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-navy-600 rounded-lg bg-white/90 dark:bg-navy-800/80 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 hover:bg-white dark:hover:bg-navy-800 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Filter Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 sm:mt-6 pt-4 border-t border-gray-100 dark:border-navy-700">
            <button
              onClick={clearAdvancedFilters}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              <MdClear className="w-4 h-4" />
              Clear All
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {getActiveFiltersCount() > 0 && (
                <span>
                  {getActiveFiltersCount()} filter
                  {getActiveFiltersCount() > 1 ? 's' : ''} applied
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
