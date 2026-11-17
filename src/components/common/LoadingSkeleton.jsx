import React from 'react';

export const LoadingSkeleton = ({ lines = 4, className = "" }) => {
  return (
    <div className={`space-y-3 animate-pulse ${className}`}>
      <div className="h-4 bg-navy-800 rounded-md w-3/4" />
      <div className="h-4 bg-navy-800 rounded-md w-full" />
      <div className="h-4 bg-navy-800 rounded-md w-5/6" />
      {lines > 3 && <div className="h-4 bg-navy-800 rounded-md w-2/3" />}
      {lines > 4 && <div className="h-4 bg-navy-800 rounded-md w-4/5" />}
    </div>
  );
};
