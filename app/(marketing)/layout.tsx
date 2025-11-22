import React from 'react';
import Header from './header';
import Footer from './footer';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default layout;
