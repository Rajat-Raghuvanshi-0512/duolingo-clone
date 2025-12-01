import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import Skeleton from '@/components/Skeleton';
import React from 'react';

const QuestsLoading = () => {
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
      </StickyWrapper>
      <FeedWrapper>
        {/* Icon Skeleton */}
        <div className="w-full flex flex-col items-center">
          <Skeleton className="h-24 w-24 rounded-xl" variant="rounded" />
        </div>
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-32 mx-auto my-6 rounded-lg" />
        {/* Description Skeleton */}
        <Skeleton className="h-6 w-64 mx-auto mb-6 rounded-lg" />
        {/* Quest List Skeleton */}
        <ul className="w-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <li
              key={i}
              className="flex items-center w-full p-4 gap-x-2 border-t-2"
            >
              <Skeleton className="h-16 w-16 rounded-xl" variant="rounded" />
              <div className="flex flex-col gap-y-2 w-full">
                <Skeleton className="h-6 w-48 rounded-lg" />
              </div>
              <Skeleton className="h-3 w-32 rounded-full" />
            </li>
          ))}
        </ul>
      </FeedWrapper>
    </div>
  );
};

export default QuestsLoading;
