import React from 'react';
import { getCourses, getUserProgress } from '@/db/queries';
import List from './List';

const CoursesPage = async () => {
  const coursesPromise = getCourses();
  const userProgressPromise = getUserProgress();
  const [courses, userProgress] = await Promise.all([
    coursesPromise,
    userProgressPromise,
  ]);
  return (
    <div className="h-full max-w-4xl mx-auto px-3">
      <h1 className="text-2xl font-bold">Language Courses</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
