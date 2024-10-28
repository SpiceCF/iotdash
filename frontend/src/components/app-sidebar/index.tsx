'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ApplicationLogo } from '@/components/app-sidebar/application-logo';
import { NavMain } from '@/components/app-sidebar/nav-main';
import { NavUser } from '@/components/app-sidebar/nav-user';

export function AppSidebar({
  data,
  ...props
}: {
  data: {
    user: React.ComponentProps<typeof NavUser>['user'];
    nav: React.ComponentProps<typeof NavMain>['items'];
  };
} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ApplicationLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.nav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
