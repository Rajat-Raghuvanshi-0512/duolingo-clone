import { getLesson, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import Quiz from '../Quiz';

const LessonIdPage = async ({
  params,
}: {
  params: Promise<{ lessonId: number }>;
}) => {
  const { lessonId } = await params;
  const lessonPromise = getLesson(lessonId);
  const userProgressPromise = getUserProgress();
  const [lesson, userProgress] = await Promise.all([
    lessonPromise,
    userProgressPromise,
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
      userSubscription={null}
    />
  );
};

export default LessonIdPage;
