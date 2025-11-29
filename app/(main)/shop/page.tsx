import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import UserProgress from '@/components/UserProgress';
import { getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import Items from './Items';
import Image from 'next/image';

const ShopPage = async () => {
  const userprogressPromise = getUserProgress();
  const [userProgress] = await Promise.all([userprogressPromise]);
  if (!userProgress || !userProgress.activeCourse) {
    return redirect('/courses');
  }
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/icons/shop.svg" alt="shop" width={90} height={90} />
        </div>
        <h1 className="text-2xl font-bold text-center text-neutral-800 my-6">
          Shop
        </h1>
        <p className="text-center text-muted-foreground mb-6 text-lg">
          Spend your points on cool stuff
        </p>
        <Items
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
