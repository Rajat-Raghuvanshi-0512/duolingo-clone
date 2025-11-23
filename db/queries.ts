import { cache } from 'react';
import { db } from './drizzle';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { courses, userProgress } from './schema';

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
