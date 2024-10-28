'use client';

import { ChartColumnIcon, CpuIcon, SatelliteDishIcon } from 'lucide-react';

const menuConfig = [
  {
    title: 'Dashboard',
    url: '/console/dashboard',
    icon: ChartColumnIcon,
    isActive: true,
  },
  {
    title: 'Devices',
    url: '/console/devices',
    icon: SatelliteDishIcon,
    isActive: false,
  },
  {
    title: 'Simulator',
    url: '#',
    icon: CpuIcon,
    isActive: true,
    items: [
      {
        title: 'Thermometer',
        url: '/console/simulator-thermometer',
      },
    ],
  },
];

export default menuConfig;
