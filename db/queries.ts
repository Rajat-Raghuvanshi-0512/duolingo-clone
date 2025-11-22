import { cache } from 'react';
import { db } from './drizzle';

export const getCourses = cache(async () => {
  try {
    const courses = await db.query.courses.findMany();
    return courses ?? [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
});
