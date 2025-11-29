import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react';
import { useKey, useMedia } from 'react-use';

type FooterProps = {
  disabled?: boolean;
  lessonId?: number;
  status: 'correct' | 'incorrect' | 'none' | 'completed';
  onCheck: () => void;
};
const Footer = ({ disabled, status, onCheck, lessonId }: FooterProps) => {
  const isMobile = useMedia('(max-width: 1024px)', false);
  useKey('Enter', onCheck, {}, [onCheck]);
  return (
    <footer
      className={cn(
        'lg:h-[140px] h-[100px] border-t-2',
        status === 'correct' && 'border-transparent bg-green-100',
        status === 'incorrect' && 'border-transparent bg-rose-100'
      )}
    >
      <div className="max-w-5xl h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === 'correct' && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="size-6 lg:h-10 lg:w-10 mr-4" />
            Nicely done!
          </div>
        )}
        {status === 'incorrect' && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="size-6 lg:h-10 lg:w-10 mr-4" />
            Try again!
          </div>
        )}
        {status === 'completed' && (
          <Button
            variant="default"
            size={isMobile ? 'sm' : 'lg'}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
          >
            Practice again
          </Button>
        )}
        <Button
          variant={status === 'incorrect' ? 'danger' : 'secondary'}
          size={isMobile ? 'sm' : 'lg'}
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
        >
          {status === 'none' && 'Continue'}
          {status === 'correct' && 'Next'}
          {status === 'incorrect' && 'Try Again'}
          {status === 'completed' && 'Next Lesson'}
        </Button>
      </div>
      <Button disabled={disabled} onClick={onCheck}>
        Check
      </Button>
    </footer>
  );
  return <div>Footer</div>;
};

export default Footer;
