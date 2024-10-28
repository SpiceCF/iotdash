'use server';

import React from 'react';

import { DeviceDashboard } from './device-dashboard';

export default async function Page({
  params,
}: {
  params: Promise<{ deviceID: string }>;
}) {
  const { deviceID } = await params;
  console.log('🚀 ~ deviceID:', deviceID);

  return <DeviceDashboard />;
}
