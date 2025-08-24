import React from "react";
import Card from "components/card";

const ComingSoon = ({ title, description }) => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <Card extra={"w-full h-full p-6"}>
          <div className="flex flex-col space-y-6">
            {title && (
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-navy-700 dark:text-white">
                  {title}
                </h2>
              </div>
            )}
            
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 dark:border-gray-700 dark:bg-gray-800">
              <div className="text-center">
                <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                  <span className="text-3xl">🚧</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-700 dark:text-gray-300">
                  Coming Soon
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  {description || `This section is currently under development. Stay tuned for exciting features and functionality!`}
                </p>
                <div className="mt-8">
                  <div className="inline-flex items-center rounded-full bg-brand-500 px-6 py-3 text-white dark:bg-brand-400">
                    <span className="text-sm font-medium">In Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComingSoon; 