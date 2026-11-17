import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../common/Sidebar';
import { Header } from '../common/Header';
import { DemoBanner } from '../common/DemoBanner';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1020] text-white flex flex-col selection:bg-[#7357FF]/40 selection:text-[#00D9FF]">
      {/* Top Demo Banner */}
      <DemoBanner />

      <div className="flex-1 flex w-full">
        {/* Navigation Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
          {/* Top Header */}
          <Header onToggleSidebar={() => setSidebarOpen(true)} />

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
            {/* Subtle atmospheric glow behind cards */}
            <div className="absolute top-10 left-1/3 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
