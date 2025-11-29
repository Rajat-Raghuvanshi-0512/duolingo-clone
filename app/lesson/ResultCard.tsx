import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

type ResultCardProps = {
  variant: 'points' | 'hearts';
  value: number;
};

const ResultCard = ({ variant, value }: ResultCardProps) => {
  const imageSrc =
    variant == 'points' ? '/icons/points.svg' : '/icons/hearts.svg';
  return (
    <div
      className={cn(
        'rounded-2xl border-2 w-full',
        variant == 'points' && 'bg-orange-400 border-orange-400',
        variant == 'hearts' && 'bg-rose-500 border-rose-500'
      )}
    >
      <div
        className={cn(
          'p-2 text-white rounded-t-xl font-bold text-center uppercase text-xs',
          variant == 'points' && 'bg-orange-400',
          variant == 'hearts' && 'bg-rose-500'
        )}
      >
        {variant == 'points' ? 'Total XP' : 'Hearts Left'}
      </div>
      <div
        className={cn(
          'rounded-2xl bg-white items-center justify-center flex p-6 text-lg font-bold',
          variant == 'points' && 'text-orange-400',
          variant == 'hearts' && 'text-rose-500'
        )}
      >
        <Image
          src={imageSrc}
          alt={variant}
          width={30}
          height={30}
          className="mr-1"
        />
        {value}
      </div>
    </div>
  );
};

export default ResultCard;
