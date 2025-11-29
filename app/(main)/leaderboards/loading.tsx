import { Loader } from 'lucide-react';
import React from 'react';

const LearnLoading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LearnLoading;
