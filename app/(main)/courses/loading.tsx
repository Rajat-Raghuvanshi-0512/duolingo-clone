import Skeleton from '@/components/Skeleton';
import React from 'react';

const CoursesLoading = () => {
  return (
    <div className="h-full max-w-4xl mx-auto px-3">
      {/* Title Skeleton */}
      <Skeleton className="h-8 w-48 mb-4 rounded-lg" />
      {/* Course Cards Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border-2 h-full rounded-xl flex flex-col items-center justify-center gap-2 p-3 pb-6 min-h-[210px] min-w-[200px]"
          >
            <div className="min-h-6 w-full flex items-center justify-end">
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
            <Skeleton className="h-[70px] w-[90px] rounded-lg" />
            <Skeleton className="h-6 w-24 mt-3 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesLoading;
