import React from 'react';
import MobileSidebar from './MobileSidebar';

const MobileHeader = () => {
  return (
    <nav className=" lg:hidden fixed top-0 left-0 right-0 z-50 bg-yellow-500 border-b-2 border-slate-200 h-12 flex items-center px-4">
      <MobileSidebar />
    </nav>
  );
};

export default MobileHeader;
