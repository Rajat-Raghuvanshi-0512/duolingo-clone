import { challengeOptions, challenges } from '@/db/schema';
import React from 'react';
import { cn } from '@/lib/utils';
import OptionCard from './OptionCard';

type ChallengeProps = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: 'correct' | 'incorrect' | 'none';
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)['type'];
};
const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: ChallengeProps) => {
  return (
    <div
      className={cn(
        'grid gap-2 lg:gap-4',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' &&
          'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0px,1fr))]'
      )}
    >
      {options.map((option, index) => (
        <OptionCard
          key={option.id}
          id={option.id}
          text={option.text}
          type={type}
          status={status}
          shortcut={`${index + 1}`}
          selected={selectedOption === option.id}
          imageSrc={option.imageSrc}
          audioSrc={option.audioSrc}
          correct={option.correct}
          disabled={disabled}
          onClick={() => onSelect(option.id)}
        />
      ))}
    </div>
  );
};

export default Challenge;
