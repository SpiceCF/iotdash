'use client';

import React from 'react';
import { getProfileQueryOptions } from '@/services/auth';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';

import ConsoleBreadcrumb from './ConsoleBreadcrumb';
import menuConfig from './menu-config';

function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const { data } = useQuery({ ...getProfileQueryOptions() });

  if (!data?.data) {
    return <div>Loading...</div>;
  }

  const user = data.data;

  return (
    <SidebarProvider>
      <AppSidebar
        data={{
          user: {
            name: user.fullName ?? '',
            email: user.email ?? '',
            avatar: '',
          },
          nav: menuConfig,
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ConsoleBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ConsoleLayout;
