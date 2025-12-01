import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import UserProgress from '@/components/UserProgress';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { getTop10Users } from '@/db/queries';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Promo from '@/components/Promo';
import Quests from '@/components/Quests';

export const dynamic = 'force-dynamic';

const LeaderboardPage = async () => {
  const userprogressPromise = getUserProgress();
  const userSubscriptionPromise = getUserSubscription();
  const top10UsersPromise = getTop10Users();
  const [userProgress, userSubscription, top10Users] = await Promise.all([
    userprogressPromise,
    userSubscriptionPromise,
    top10UsersPromise,
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
        <div className="w-full flex flex-col items-center">
          <Image
            src="/icons/leaderboard.svg"
            alt="leaderboard"
            width={90}
            height={90}
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-neutral-800 my-6">
          Leaderboard
        </h1>
        <p className="text-center text-muted-foreground mb-6 text-lg">
          See how you rank against other users
        </p>
        <Separator className="mb-4 h-0.5 rounded-full " />
        {top10Users.map((user, index) => (
          <div
            key={user.userId}
            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50 transition-all duration-300"
          >
            <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
            <Avatar className="border bg-green-500 size-12 ml-3 mr-6">
              <AvatarImage src={user.userImageSrc} className="object-cover" />
            </Avatar>
            <p className="font-bold text-neutral-800 flex-1">{user.userName}</p>
            <p className="text-muted-foreground">{user.points} XP</p>
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
