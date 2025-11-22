import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-7 lg:-mt-7 flex items-center justify-between border-b-2 text-neutral-400 lg:z-50 mb-5">
      <Link href="/courses">
        <Button variant="ghost" size="icon">
          <ArrowLeftIcon className="size-5 stroke-2 text-neutral-400" />
        </Button>
      </Link>
      <h1 className="text-lg font-bold ">{title}</h1>
      <div />
    </div>
  );
};

export default Header;
