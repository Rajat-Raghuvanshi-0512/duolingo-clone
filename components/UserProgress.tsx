import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { InfinityIcon } from 'lucide-react';
import { courses, userProgress } from '@/db/schema';

type UserProgressProps = {
  activeCourse: typeof courses.$inferSelect;
  hearts: (typeof userProgress.$inferSelect)['hearts'];
  points: (typeof userProgress.$inferSelect)['points'];
  hasActiveSubscription: boolean;
};

const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) => {
  return (
    <div className="flex justify-between items-center w-full gap-x-2">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            width={32}
            height={32}
            className="rounded-md border"
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/icons/points.svg"
            alt="points"
            width={28}
            height={28}
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/icons/hearts.svg"
            alt="hearts"
            width={32}
            height={32}
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="size-4 stroke-3" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
