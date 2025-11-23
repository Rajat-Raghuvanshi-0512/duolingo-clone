import { Button } from '@/components/ui/button';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type UnitBannerProps = {
  title: string;
  description: string;
};

const UnitBanner = ({ title, description }: UnitBannerProps) => {
  return (
    <div className="rounded-xl w-full bg-green-500 p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <Link href={`/lesson`}>
        <Button
          variant="secondary"
          size="lg"
          className="hidden lg:flex border-2 border-b-4 active:border-b-2"
        >
          <NotebookText className="size-6 mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};

export default UnitBanner;
