import React from 'react';
import { Toaster } from '@/components/ui/sonner';

const LessonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flec-col h-full">
      <div className="flex flex-col h-full w-full">{children}</div>
      <Toaster />
    </div>
  );
};

export default LessonLayout;
