'use client';

import { courses, userProgress } from '@/db/schema';
import Card from './Card';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { upsertUserProgress } from '@/actions/userProgress';
import { toast } from 'sonner';

type ListProps = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: (typeof userProgress.$inferSelect)['activeCourseId'];
};

const List = ({ courses, activeCourseId }: ListProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = (id: number) => {
    if (pending) return;
    if (activeCourseId === id) {
      router.push(`/learn`);
      return;
    }
    startTransition(async () => {
      await upsertUserProgress(id).catch((err) => {
        // Next.js redirect() throws a special error that should not be caught
        // Check if it's a redirect error by checking the digest or message
        const isRedirectError =
          err?.digest?.includes('NEXT_REDIRECT') ||
          err?.message?.includes('NEXT_REDIRECT') ||
          err?.name === 'RedirectError';

        if (isRedirectError) {
          // This is expected behavior, don't show error toast
          return;
        }
        console.error(err);
        toast.error('Something went wrong');
      });
    });
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={handleClick}
          disabled={pending}
          active={activeCourseId === course.id}
        />
      ))}
    </div>
  );
};

export default List;
