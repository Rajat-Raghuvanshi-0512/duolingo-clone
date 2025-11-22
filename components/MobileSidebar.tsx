import React from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';
import { MenuIcon } from 'lucide-react';
import Sidebar from './Sidebar';

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="size-6 text-white" />
      </SheetTrigger>
      <SheetContent aria-describedby="sidebar" side="left">
        <SheetTitle className="sr-only">Sidebar</SheetTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
