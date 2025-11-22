import MobileHeader from '@/components/MobileHeader';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-12 lg:pt-0">
        <div className="h-full w-full max-w-5xl mx-auto pt-6">{children}</div>
      </main>
    </>
  );
};

export default layout;
