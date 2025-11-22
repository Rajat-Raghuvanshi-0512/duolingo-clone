import React from 'react';
import { getCourses } from '@/db/queries';
import List from './List';

const CoursesPage = async () => {
  const courses = await getCourses();
  console.log(courses);
  return (
    <div className="h-full max-w-4xl mx-auto px-3">
      <h1 className="text-2xl font-bold">Language Courses</h1>
      <List courses={courses} activeCourseId={2} />
    </div>
  );
};

export default CoursesPage;
