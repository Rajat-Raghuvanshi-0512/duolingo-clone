import { cache } from 'react';
import { db } from './drizzle';
import { auth } from '@clerk/nextjs/server';
import { asc, eq } from 'drizzle-orm';
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
} from './schema';

export const getCourses = cache(async () => {
  try {
    const courses = await db.query.courses.findMany();
    return courses ?? [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
});

export const getUserProgress = cache(async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }
    const data = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
      with: {
        activeCourse: true,
      },
    });
    return data ?? null;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return null;
  }
});

export const getCourseById = cache(async (id: number) => {
  try {
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, id),
    });
    return course ?? null;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
});

export const getUnits = cache(async () => {
  try {
    const { userId } = await auth();

    const userProgress = await getUserProgress();
    if (!userId || !userProgress?.activeCourseId) {
      return [];
    }
    const data = await db.query.units.findMany({
      where: eq(units.courseId, userProgress.activeCourseId),
      with: {
        lessons: {
          with: {
            challenges: {
              with: {
                progress: {
                  where: eq(challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
    });

    const normalizedData = data.map((unit) => ({
      ...unit,
      lessons: unit.lessons.map((lesson) => ({
        ...lesson,
        completed:
          lesson.challenges.length > 0
            ? lesson.challenges.every((challenge) => {
                return (
                  challenge.progress &&
                  challenge.progress?.length > 0 &&
                  challenge.progress.every((p) => p.completed)
                );
              })
            : false,
      })),
    }));

    return normalizedData ?? [];
  } catch (error) {
    console.error('Error fetching units:', error);
    return [];
  }
});

export const getCourseProgress = cache(async () => {
  try {
    const { userId } = await auth();
    const userProgress = await getUserProgress();
    if (!userId || !userProgress?.activeCourseId) {
      return null;
    }
    const unitsInActiveCourse = await db.query.units.findMany({
      where: eq(units.courseId, userProgress.activeCourseId),
      orderBy: [asc(units.order)],
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)],
          with: {
            unit: true,
            challenges: {
              with: {
                progress: {
                  where: eq(challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
    });

    const firstUncompletedLesson = unitsInActiveCourse
      .flatMap((unit) => unit.lessons)
      .find((lesson) =>
        lesson.challenges.some(
          (challenge) =>
            !challenge.progress ||
            challenge.progress.length === 0 ||
            challenge.progress.some((p) => p.completed === false)
        )
      );

    return {
      activeLesson: firstUncompletedLesson ?? null,
      activeLessonId: firstUncompletedLesson?.id ?? null,
    };
  } catch (error) {
    console.error('Error fetching course progress:', error);
    return null;
  }
});

export const getLesson = cache(async (id?: number) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }
    const courseProgress = await getCourseProgress();
    const lessonId = id ?? courseProgress?.activeLessonId;
    if (!lessonId) {
      return null;
    }
    const data = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
      with: {
        challenges: {
          orderBy: (challenges, { asc }) => [asc(challenges.order)],
          with: {
            progress: {
              where: eq(challengeProgress.userId, userId),
            },
            options: true,
          },
        },
      },
    });
    if (!data || !data.challenges.length) {
      return null;
    }
    const normalizedData = {
      ...data,
      challenges: data.challenges.map((challenge) => ({
        ...challenge,
        completed:
          challenge.progress?.length > 0 &&
          challenge.progress.every((p) => p.completed),
      })),
    };
    return normalizedData ?? null;
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return null;
  }
});

export const getLessonPercentage = cache(async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return 0;
    }
    const courseProgress = await getCourseProgress();
    if (!courseProgress?.activeLessonId) {
      return 0;
    }
    const lesson = await getLesson(courseProgress.activeLessonId);
    if (!lesson) {
      return 0;
    }
    const completedChallenges = lesson.challenges.filter(
      (challenge) => challenge.completed
    );
    const percentage = Math.round(
      (completedChallenges.length / lesson.challenges.length) * 100
    );
    return percentage;
  } catch (error) {
    console.error('Error fetching lesson percentage:', error);
    return 0;
  }
});
