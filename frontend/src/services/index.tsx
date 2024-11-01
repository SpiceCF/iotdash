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

export function getAccessToken(): string {
  const cookies = new Cookies();

  const jwt = cookies.get('accessToken') as string;

  if (!jwt) {
    if (typeof window !== 'undefined') {
      throw new Error('Please login first');
    }
  }

  return jwt;
}
