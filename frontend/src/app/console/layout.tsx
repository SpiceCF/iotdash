import React from 'react';

import { DashboardLayoutComponent } from '@/components/dashboard-layout';

function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}

export default ConsoleLayout;
