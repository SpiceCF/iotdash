'use client';

import {
  Label,
  Line,
  LineChart,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import ActiveDeviceChart from '@/components/charts/ActiveDeviceChart';

const lineChartData = [
  { time: '13:00', Bedroom: 40, Kitchen: 55 },
  { time: '14:00', Bedroom: 45, Kitchen: 60 },
  { time: '15:00', Bedroom: 55, Kitchen: 65 },
  { time: '16:00', Bedroom: 50, Kitchen: 60 },
  { time: '17:00', Bedroom: 35, Kitchen: 60 },
  { time: '18:00', Bedroom: 25, Kitchen: 55 },
];

const alertLogData = [
  {
    timestamp: '2024-10-24 06:00:00.00000+07:00',
    event: '[ Bedroom ] Critical Low @ *47',
  },
  {
    timestamp: '2024-10-24 10:00:00.00000+07:00',
    event: '[ Bedroom ] Back to Normal @ *52',
  },
  {
    timestamp: '2024-10-24 12:00:00.00000+07:00',
    event: '[ Bedroom ] Critical High @ *60',
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActiveDeviceChart />
        <ActiveDeviceChart />
        <ActiveDeviceChart />
        <ActiveDeviceChart />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alert Log</CardTitle>
        </CardHeader>
        <CardContent>
          {alertLogData.map((alert, index) => (
            <div key={index} className="text-sm">
              {alert.timestamp}: {alert.event}
            </div>
          ))}
        </CardContent>
      </Card>

      <div>
        <span className="mr-2">Period:</span>
        {['1s', '10s', '1min', '1h', '1d'].map((period) => (
          <Button key={period} variant="outline" className="mr-2">
            {period}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Temperature Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              Bedroom: {
                label: 'Bedroom',
                color: 'hsl(var(--chart-1))',
              },
              Kitchen: {
                label: 'Kitchen',
                color: 'hsl(var(--chart-2))',
              },
            }}
            className="h-[300px]"
          >
            <LineChart
              data={lineChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="Bedroom"
                stroke="var(--color-Bedroom)"
              />
              <Line
                type="monotone"
                dataKey="Kitchen"
                stroke="var(--color-Kitchen)"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
