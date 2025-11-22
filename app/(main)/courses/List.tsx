'use client';

import { courses } from '@/db/schema';
import Card from './Card';

type ListProps = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId: number;
};

const List = ({ courses, activeCourseId }: ListProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={() => {}}
          disabled={false}
          active={activeCourseId === course.id}
        />
      ))}
    </div>
  );
};

export default List;
