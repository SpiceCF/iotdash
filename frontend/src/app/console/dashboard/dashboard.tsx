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
  { time: '00:00', Bedroom: 22, Kitchen: 25 },
  { time: '01:00', Bedroom: 21, Kitchen: 24 },
  { time: '02:00', Bedroom: 20, Kitchen: 23 },
  { time: '03:00', Bedroom: 19, Kitchen: 22 },
  { time: '04:00', Bedroom: 20, Kitchen: 23 },
  { time: '05:00', Bedroom: 21, Kitchen: 24 },
  { time: '06:00', Bedroom: 22, Kitchen: 25 },
  { time: '07:00', Bedroom: 23, Kitchen: 26 },
  { time: '08:00', Bedroom: 25, Kitchen: 35 },
  { time: '09:00', Bedroom: 27, Kitchen: 37 },
  { time: '10:00', Bedroom: 29, Kitchen: 39 },
  { time: '11:00', Bedroom: 31, Kitchen: 41 },
  { time: '12:00', Bedroom: 45, Kitchen: 55 },
  { time: '13:00', Bedroom: 43, Kitchen: 53 },
  { time: '14:00', Bedroom: 41, Kitchen: 51 },
  { time: '15:00', Bedroom: 39, Kitchen: 49 },
  { time: '16:00', Bedroom: 40, Kitchen: 50 },
  { time: '17:00', Bedroom: 38, Kitchen: 48 },
  { time: '18:00', Bedroom: 36, Kitchen: 46 },
  { time: '19:00', Bedroom: 34, Kitchen: 44 },
  { time: '20:00', Bedroom: 30, Kitchen: 40 },
  { time: '21:00', Bedroom: 28, Kitchen: 38 },
  { time: '22:00', Bedroom: 26, Kitchen: 36 },
  { time: '23:00', Bedroom: 24, Kitchen: 34 },
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
                color: 'hsl(var(--chart-3))',
              },
              Kitchen: {
                label: 'Kitchen',
                color: 'hsl(var(--chart-5))',
              },
            }}
            className="aspect-auto h-60"
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
