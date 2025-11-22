'use client';

import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

import Link from 'next/link';
import Image from 'next/image';

type SidebarItemProps = {
  label: string;
  iconSrc: string;
  href: string;
};
const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Button
      variant={isActive ? 'sidebarOutline' : 'sidebar'}
      className="justify-start h-13"
      asChild
    >
      <Link href={href}>
        <Image src={iconSrc} alt={label} width={32} height={32} />
        <span>{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
