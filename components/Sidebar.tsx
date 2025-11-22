import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import SidebarItem from './SidebarItem';
import { ClerkLoaded, UserButton, ClerkLoading } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

type SidebarProps = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
};

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        'h-full lg:w-[256px] flex-col lg:fixed inset-y-0 z-50 border-r-2 p-4',
        className
      )}
    >
      <Link href="/">
        <div className="flex items-center gap-3 pt-8 pb-7 pl-3">
          <Image src="/logo.svg" alt="logo" width={150} height={150} />
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" iconSrc={'/icons/home.svg'} href="/learn" />
        <SidebarItem
          label="Practice"
          iconSrc={'/icons/practice.svg'}
          href="/practice"
        />
        <SidebarItem
          label="Leaderboards"
          iconSrc={'/icons/leaderboard.svg'}
          href="/leaderboards"
        />
        <SidebarItem
          label="Quests"
          iconSrc={'/icons/quest.svg'}
          href="/quests"
        />
        <SidebarItem label="Shop" iconSrc={'/icons/shop.svg'} href="/shop" />
        <SidebarItem label="More" iconSrc={'/icons/more.svg'} href="/more" />
      </div>
      <div>
        <ClerkLoading>
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Sidebar;
