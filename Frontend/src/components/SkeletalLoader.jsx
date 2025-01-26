import React from "react";

const SkeletalLoader = () => {
  return (
    <div className="space-y-4 w-full max-w-md p-4 mx-auto">
      {/* Title Loader */}
      <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4"></div>
      {/* Paragraph Lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  );
};

export default SkeletalLoader;
