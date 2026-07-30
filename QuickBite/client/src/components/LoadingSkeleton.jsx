import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 6 }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="skeleton h-44 rounded-none rounded-t-3xl" />
            <div className="p-4 space-y-3">
              <div className="skeleton h-4 w-3/4 rounded-lg" />
              <div className="skeleton h-3 w-full rounded-lg" />
              <div className="skeleton h-3 w-5/6 rounded-lg" />
              <div className="flex justify-between items-center pt-2">
                <div className="skeleton h-6 w-16 rounded-lg" />
                <div className="skeleton h-9 w-20 rounded-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'stat') {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card p-6 space-y-3">
            <div className="skeleton h-4 w-1/2 rounded-lg" />
            <div className="skeleton h-8 w-3/4 rounded-lg" />
            <div className="skeleton h-3 w-2/3 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="card overflow-hidden">
        <div className="skeleton h-12 rounded-none" />
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-t border-gray-100 dark:border-gray-800">
            <div className="skeleton h-4 flex-1 rounded-lg" />
            <div className="skeleton h-4 w-24 rounded-lg" />
            <div className="skeleton h-4 w-20 rounded-lg" />
            <div className="skeleton h-4 w-16 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
