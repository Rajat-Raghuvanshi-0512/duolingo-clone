import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import UserProgress from '@/components/UserProgress';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import Promo from '@/components/Promo';
import { quests } from '@/lib/constants';

export const dynamic = 'force-dynamic';

const QuestsPage = async () => {
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
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/icons/quest.svg" alt="quests" width={90} height={90} />
        </div>
        <h1 className="text-2xl font-bold text-center text-neutral-800 my-6">
          Quests
        </h1>
        <p className="text-center text-muted-foreground mb-6 text-lg">
          Complete quests to earn rewards
        </p>
        <ul className="w-full">
          {quests.map((quest) => {
            const progress = (userProgress.points / quest.value) * 100;
            return (
              <li
                key={quest.id}
                className="flex items-center w-full p-4 gap-x-2 border-t-2"
              >
                <Image
                  src="/icons/points.svg"
                  alt="points"
                  width={60}
                  height={60}
                />
                <div className="flex flex-col gap-y-2 w-full">
                  <p className="text-neutral-700 text-xl font-bold">
                    {quest.title}
                  </p>
                </div>
                <Progress value={progress} className="h-3" />
              </li>
            );
          })}
        </ul>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
