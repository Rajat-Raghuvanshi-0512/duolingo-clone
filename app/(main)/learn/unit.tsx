import { lessons, units } from '@/db/schema';
import UnitBanner from './UnitBanner';
import LessonButton from './lessonButton';

type UnitCardProps = {
  id: number;
  order: number;
  title: string;
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
  description: string;
  activeLesson?:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | null;
  activeLessonPercentage?: number;
};

const UnitCard = ({
  id,
  order,
  title,
  lessons,
  description,
  activeLesson,
  activeLessonPercentage = 0,
}: UnitCardProps) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex flex-col items-center relative">
        {lessons.map((lesson, index) => {
          const isCurrentLesson = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrentLesson;
          return (
            <div key={lesson.id}>
              <LessonButton
                id={lesson.id}
                index={index}
                totalCount={lessons.length - 1}
                locked={isLocked}
                current={isCurrentLesson}
                percentage={activeLessonPercentage}
                isCompleted={lesson.completed}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UnitCard;
