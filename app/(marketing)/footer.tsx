import React from 'react';

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 p-2 border-slate-200">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
