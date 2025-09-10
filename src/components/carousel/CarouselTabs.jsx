import React, { useState, useRef, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const CarouselTabs = ({ 
  tabs = [], 
  activeTab, 
  onTabChange, 
  className = "",
  showArrows = true,
  arrowSize = "w-6 h-6"
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Check scroll position on mount and when tabs change
  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tabs]);

  // Check scroll position when scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Left Arrow */}
      {showArrows && canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-navy-600 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-navy-500 transition-all duration-200 border border-gray-200 dark:border-navy-500"
          aria-label="Scroll left"
        >
          <MdChevronLeft className={`${arrowSize} text-gray-600 dark:text-gray-300`} />
        </button>
      )}

      {/* Right Arrow */}
      {showArrows && canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-navy-600 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-navy-500 transition-all duration-200 border border-gray-200 dark:border-navy-500"
          aria-label="Scroll right"
        >
          <MdChevronRight className={`${arrowSize} text-gray-600 dark:text-gray-300`} />
        </button>
      )}

      {/* Tabs Container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex space-x-1 bg-gray-100 dark:bg-navy-700 p-1 rounded-lg min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-navy-600 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-navy-600'
              }`}
              style={{ minWidth: 'fit-content' }}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              {tab.count !== undefined && (
                <span className="ml-1 text-xs">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Gradient fade indicators for mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-gray-100 to-transparent dark:from-navy-700 dark:to-transparent pointer-events-none sm:hidden"></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-gray-100 to-transparent dark:from-navy-700 dark:to-transparent pointer-events-none sm:hidden"></div>
    </div>
  );
};

export default CarouselTabs;
