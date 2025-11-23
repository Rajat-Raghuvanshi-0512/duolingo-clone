'use client';

import { challengeOptions, challenges } from '@/db/schema';
import React, { useState } from 'react';
import Header from './Header';

type QuizProps = {
  initialPercentage: number;
  initialChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    options: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialLessonId: number;
  initalHeartCount: number;
  userSubscription: null;
};
const Quiz = ({
  initialPercentage,
  initialChallenges,
  initialLessonId,
  initalHeartCount,
  userSubscription,
}: QuizProps) => {
  const [hearts, setHearts] = useState(initalHeartCount);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(() => {
    const unCompletedChallengeIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return unCompletedChallengeIndex !== -1 ? unCompletedChallengeIndex : 0;
  });

  const challenge = challenges[activeChallengeIndex];
  const title =
    challenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : challenge.question;
  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={false}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] h-[300px] w-full lg:max-w-[600px] mx-auto  px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="lg:text-3xl text-xl lg:text-start font-bold text-center text-neutral-700">
              {title}
            </h1>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
