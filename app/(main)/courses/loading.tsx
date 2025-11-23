import { Loader } from 'lucide-react';

const CoursesLoading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
};

export default CoursesLoading;
