'use client';

import { challengeOptions, challenges } from '@/db/schema';
import React, { useState, useTransition } from 'react';
import Header from './Header';
import QuestionBubble from './QuestionBubble';
import Challenge from './Challenge';
import Footer from './Footer';
import { updateChallengeProgress } from '@/actions/challengeProgress';
import { toast } from 'sonner';
import { reduceHearts } from '@/actions/userProgress';

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
  const [pending, startTransition] = useTransition();
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

  const onNext = () => {
    setActiveChallengeIndex((prev) => prev + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === 'incorrect') {
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    if (status === 'correct') {
      onNext();
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find((option) => option.correct);
    if (correctOption?.id === selectedOption) {
      startTransition(async () => {
        await updateChallengeProgress(challenge.id)
          .then(() => {
            setStatus('correct');
            setPercentage((prev) => (prev + 100) / challenges.length);

            // Practice challenge
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => {
            toast.error('Something went wrong. Please try again.');
          });
      });
    } else {
      startTransition(async () => {
        await reduceHearts(challenge.id)
          .then((result) => {
            if (result?.error === 'hearts') {
              toast.error('You have no hearts left. Please buy more hearts.');
              return;
            }
            setStatus('incorrect');
            if (!result?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => {
            toast.error('Something went wrong. Please try again.');
          });
      });
    }
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
                disabled={pending || status !== 'none'}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default Quiz;
