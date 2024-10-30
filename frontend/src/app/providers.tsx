'use client';

import React from 'react';
import { ServiceProvider } from '@/services';
import { QueryClient } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const TanStackQueryDevtools = React.lazy(() =>
  import('@tanstack/react-query-devtools').then((res) => ({
    default: res.ReactQueryDevtools,
  }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      retry: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ServiceProvider queryClient={queryClient}>
        <ToastProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ToastProvider>
        <React.Suspense>
          <TanStackQueryDevtools />
        </React.Suspense>
      </ServiceProvider>
    </SessionProvider>
  );
}

export default Providers;
