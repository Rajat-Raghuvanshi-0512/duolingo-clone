'use client';

import { challengeOptions, challenges } from '@/db/schema';
import React, { useState } from 'react';
import Header from './Header';
import QuestionBubble from './QuestionBubble';
import Challenge from './Challenge';
import Footer from './Footer';

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
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [status, setStatus] = useState<'correct' | 'incorrect' | 'none'>(
    'none'
  );

  const onSelect = (optionId: number) => {
    if (status !== 'none') return;
    setSelectedOption(optionId);
  };

  const challenge = challenges[activeChallengeIndex];
  const options = challenge.options ?? [];

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
          <div className="lg:min-h-[350px] h-[300px] w-full lg:max-w-2xl mx-auto  px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="lg:text-3xl text-xl lg:text-start font-bold text-center text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === 'ASSIST' ? (
                <QuestionBubble question={challenge.question} />
              ) : (
                <div></div>
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={status !== 'none'}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer disabled={!selectedOption} status={status} onCheck={() => {}} />
    </>
  );
};

export default Quiz;
