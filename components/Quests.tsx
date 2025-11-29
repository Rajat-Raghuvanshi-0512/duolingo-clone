import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { quests } from '@/lib/constants';
import { Progress } from './ui/progress';

type QuestsProps = {
  points: number;
};

const Quests = ({ points }: QuestsProps) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/icons/quest.svg" alt="quests" width={26} height={26} />
          <h3 className="text-lg font-bold">Complete Quests</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Complete quests to earn rewards
        </p>
      </div>
      <ul className="w-full">
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100;
          return (
            <li
              key={quest.id}
              className="flex items-center w-full pb-4 gap-x-2"
            >
              <Image
                src="/icons/points.svg"
                alt="points"
                width={60}
                height={60}
              />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-xl font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Quests;
