import React from 'react';
import { cn } from '@/lib/utils';

type ComingSoonProps = {
  title?: string;
  message?: string;
  className?: string;
};

const ComingSoon = ({
  title = 'Coming Soon',
  message = 'We are working on something amazing. Stay tuned!',
  className,
}: ComingSoonProps) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center py-12 px-6',
        className
      )}
    >
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">{message}</p>
      </div>
    </div>
  );
};

export default ComingSoon;
