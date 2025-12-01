import React from 'react';
import { cn } from '@/lib/utils';

type SkeletonProps = {
  className?: string;
  variant?: 'default' | 'circular' | 'rounded';
};

const Skeleton = ({ className, variant = 'default' }: SkeletonProps) => {
  const baseClasses = 'animate-pulse bg-muted';
  const variantClasses = {
    default: 'rounded-lg',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
    />
  );
};

export default Skeleton;

