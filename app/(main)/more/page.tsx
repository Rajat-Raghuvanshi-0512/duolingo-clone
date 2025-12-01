import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import UserProgress from '@/components/UserProgress';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import ComingSoon from '@/components/ComingSoon';
import Promo from '@/components/Promo';
import Quests from '@/components/Quests';

export const dynamic = 'force-dynamic';

const MorePage = async () => {
  const userprogressPromise = getUserProgress();
  const userSubscriptionPromise = getUserSubscription();
  const [userProgress, userSubscription] = await Promise.all([
    userprogressPromise,
    userSubscriptionPromise,
  ]);
  if (!userProgress || !userProgress.activeCourse) {
    return redirect('/courses');
  }
  const hasActiveSubscription = !!userSubscription?.isActive;
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={hasActiveSubscription}
        />
        {!hasActiveSubscription && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <ComingSoon />
      </FeedWrapper>
    </div>
  );
};

export default MorePage;
