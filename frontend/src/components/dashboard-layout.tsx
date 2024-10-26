'use client';

import { Header } from './dashboard/Header';
import { Sidebar } from './dashboard/Sidebar';

export function DashboardLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex h-dvh flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
