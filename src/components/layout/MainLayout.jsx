import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { DemoBanner } from '../common/DemoBanner';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1020] text-white selection:bg-[#7357FF]/40 selection:text-[#00D9FF]">
      <DemoBanner />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
