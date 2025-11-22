import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

type CardProps = {
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled: boolean;
  active: boolean;
  id: number;
};

const Card = ({
  title,
  imageSrc,
  onClick,
  disabled,
  active,
  id,
}: CardProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        'border-2 h-full rounded-xl hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-center gap-2 p-3 pb-6 min-h-[210px] min-w-[200px]',
        active && 'border-sky-500 bg-sky-500/10',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      <div className="min-h-6 w-full flex items-center justify-end">
        {active && (
          <div className="bg-green-600 flex items-center justify-center rounded-md p-1.5">
            <CheckIcon className="size-4 text-white stroke-4" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        width={90}
        height={70}
        className="rounded-lg drop-shadow-md border object-cover"
      />
      <p className="text-lg font-bold text-neutral-700 text-center mt-3">
        {title}
      </p>
    </button>
  );
};

export default Card;
