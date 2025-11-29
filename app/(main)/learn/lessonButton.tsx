'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Crown, Star } from 'lucide-react';
import Link from 'next/link';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  isCompleted: boolean;
};

const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
  isCompleted,
}: LessonButtonProps) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;
  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirstItem = index === 0;
  const isLastItem = index === totalCount;

  const Icon = isCompleted ? Check : isLastItem ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : `/lesson`;

  console.log('percentage', percentage);
  console.log('isCompleted', isCompleted);
  console.log('isLastItem', isLastItem);
  console.log('href', href);
  console.log('locked', locked);
  console.log('current', current);

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? 'none' : 'auto' }}
    >
      <div
        className="relative"
        style={{
          right: rightPosition + 'px',
          marginTop: isFirstItem && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="relative w-[102px] h-[102px]">
            <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
              Start
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              text={`${percentage}%`}
              styles={{
                path: {
                  stroke: '#4ade80',
                },
                trail: {
                  stroke: '#e5e7eb',
                },
              }}
            >
              <Button
                size="rounded"
                variant={locked ? 'locked' : 'secondary'}
                className="h-[70px] w-[70px] border-b-8"
              >
                <Icon
                  className={cn(
                    'size-10',
                    locked
                      ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                      : 'fill-primary-foreground text-primary-foreground ',
                    isCompleted && 'fill-none stroke-4'
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button
            size="rounded"
            variant={locked ? 'locked' : 'secondary'}
            className="h-[70px] w-[70px] border-b-8"
          >
            <Icon
              className={cn(
                'size-10',
                locked
                  ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                  : 'fill-primary-foreground text-primary-foreground ',
                isCompleted && 'fill-none stroke-4'
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};

export default LessonButton;
