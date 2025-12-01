import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import Skeleton from '@/components/Skeleton';
import React from 'react';

const MoreLoading = () => {
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        {/* UserProgress Skeleton */}
        <div className="flex justify-between items-center w-full gap-x-2 mb-4">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        {/* Promo Skeleton */}
        <div className="border-2 rounded-xl p-4 space-y-4 mb-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
          </div>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        {/* Quests Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-24 rounded-lg" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <Skeleton className="h-4 flex-1 rounded-lg" />
            </div>
          ))}
        </div>
      </StickyWrapper>
      <FeedWrapper>
        {/* Coming Soon Content Skeleton */}
        <div className="w-full flex flex-col items-center justify-center py-12 px-6">
          <div className="text-center space-y-4">
            <Skeleton className="h-9 w-48 mx-auto rounded-lg" />
            <Skeleton className="h-6 w-80 mx-auto rounded-lg" />
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default MoreLoading;
