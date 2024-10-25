import React from 'react';
import {
  ActiveEnergyBarChart,
  ActivityProgressBarChart,
  ActivityRadialBarChart,
  ProgressBarChart,
  RestingHeartRateLineChart,
  StepsBarChart,
  TimeInBedAreaChart,
  WalkingDistanceBarChart,
} from '@webapps/shared-ui/components/charts';

function Dashboard() {
  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <StepsBarChart />
        <RestingHeartRateLineChart />
      </div>
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        <ProgressBarChart />
        <WalkingDistanceBarChart />
        <ActivityProgressBarChart />
      </div>
      <div className="grid w-full flex-1 gap-6">
        <ActivityRadialBarChart />
        <ActiveEnergyBarChart />
        <TimeInBedAreaChart />
      </div>
    </div>
  );
}

export default Dashboard;
