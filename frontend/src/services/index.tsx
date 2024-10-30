import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Cookies } from 'react-cookie';

export function ServiceProvider({
  queryClient,
  children,
}: {
  queryClient: QueryClient;
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function getAccessToken(): string | undefined {
  const cookies = new Cookies();
  return cookies.get('accessToken') as string;
}
