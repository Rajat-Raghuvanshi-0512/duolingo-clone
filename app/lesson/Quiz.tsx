'use client';

import { challengeOptions, challenges } from '@/db/schema';
import { useState, useTransition } from 'react';
import Header from './Header';
import QuestionBubble from './QuestionBubble';
import Challenge from './Challenge';
import Footer from './Footer';
import { updateChallengeProgress } from '@/actions/challengeProgress';
import { toast } from 'sonner';
import { reduceHearts } from '@/actions/userProgress';
import { useAudio, useMount, useWindowSize } from 'react-use';
import ResultCard from './ResultCard';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import { useHeartsModal } from '@/store/useHeartsModal';
import { usePracticeModal } from '@/store/usePracticeModal';

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
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [correctAudio, _c, correctControls] = useAudio({
    src: '/audio/correct.mp3',
  });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: '/audio/error.mp3',
  });
  const [finishedAudio] = useAudio({
    src: '/audio/finish.mp3',
    autoPlay: true,
  });
  const { openModal: openHeartsModal } = useHeartsModal();
  const { openModal: openPracticeModal } = usePracticeModal();
  const [lessonId, setLessonId] = useState(initialLessonId);
  const [pending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initalHeartCount);
  const [percentage, setPercentage] = useState(() => {
    // If the initial percentage is 100, set it to 0 as it is practice lesson
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
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

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

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
          .then((result) => {
            if (result?.error === 'hearts') {
              openHeartsModal();
              return;
            }
            setStatus('correct');
            setPercentage((prev) => prev + 100 / challenges.length);
            correctControls.play();

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
              openHeartsModal();
              return;
            }
            setStatus('incorrect');
            incorrectControls.play();
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

  if (!challenge) {
    return (
      <>
        {finishedAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <div className="text-4xl lg:text-6xl">🎉</div>
          <h1 className="text-xl lg:text-3xl font-bold text-center text-neutral-700">
            Great job! <br />
            You&apos;ve completed the lesson!
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push(`/learn`)}
        />
      </>
    );
  }

  const options = challenge.options ?? [];
  const title =
    challenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : challenge.question;
  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={false}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] w-full lg:max-w-2xl mx-auto  px-6 lg:px-0 flex flex-col gap-y-12">
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
