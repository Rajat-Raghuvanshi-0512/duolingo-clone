import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import Quiz from './Quiz';

export const dynamic = 'force-dynamic';

const LessonPage = async () => {
  const lessonPromise = getLesson();
  const userProgressPromise = getUserProgress();
  const userSubscriptionPromise = getUserSubscription();
  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonPromise,
    userProgressPromise,
    userSubscriptionPromise,
  ]);

  if (!lesson || !userProgress) {
    return redirect('/learn');
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;
  return (
    <Quiz
      initialPercentage={initialPercentage}
      initialChallenges={lesson.challenges}
      initialLessonId={lesson.id}
      initalHeartCount={userProgress.hearts}
      userSubscription={userSubscription}
    />
  );
};

export default LessonPage;
