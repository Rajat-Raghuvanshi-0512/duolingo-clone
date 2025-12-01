import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import Skeleton from '@/components/Skeleton';
import React from 'react';

const LeaderboardLoading = () => {
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
        {/* Icon Skeleton */}
        <div className="w-full flex flex-col items-center">
          <Skeleton className="h-24 w-24 rounded-xl" variant="rounded" />
        </div>
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-40 mx-auto my-6 rounded-lg" />
        {/* Description Skeleton */}
        <Skeleton className="h-6 w-72 mx-auto mb-6 rounded-lg" />
        {/* Separator Skeleton */}
        <Skeleton className="h-0.5 w-full mb-4 rounded-full" />
        {/* User List Skeleton */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div
            key={i}
            className="flex items-center w-full p-2 px-4 rounded-xl mb-2"
          >
            <Skeleton className="h-6 w-6 mr-4 rounded-lg" />
            <Skeleton className="h-12 w-12 rounded-full ml-3 mr-6" variant="circular" />
            <Skeleton className="h-5 flex-1 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-lg" />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardLoading;
