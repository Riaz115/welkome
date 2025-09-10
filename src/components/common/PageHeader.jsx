import React from 'react';
import { MdAdd, MdArrowBack } from 'react-icons/md';

const PageHeader = ({
  title = "Page Title",
  subtitle = "Page description",
  showBackButton = false,
  onBackClick,
  backButtonText = "Back",
  primaryAction = null,
  secondaryActions = [],
  breadcrumbs = null
}) => {
  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <div className="mb-4">
          {breadcrumbs}
        </div>
      )}

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Left Side - Title and Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors self-start sm:self-auto"
            >
              <MdArrowBack className="w-4 h-4" />
              <span className="text-sm font-medium">{backButtonText}</span>
            </button>
          )}
          
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-navy-700 dark:text-white break-words">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 break-words">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Secondary Actions */}
          {secondaryActions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {secondaryActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    action.variant === 'secondary' 
                      ? 'bg-gray-100 hover:bg-gray-200 dark:bg-navy-700 dark:hover:bg-navy-600 text-gray-700 dark:text-white'
                      : action.variant === 'danger'
                      ? 'bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-navy-700 dark:hover:bg-navy-600 text-gray-700 dark:text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {action.icon && <span className="w-4 h-4">{action.icon}</span>}
                  <span className="hidden sm:inline">{action.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Primary Action */}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-400 text-white rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              {primaryAction.icon && <span className="w-4 h-4">{primaryAction.icon}</span>}
              <span className="text-sm font-medium">
                {primaryAction.label}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
