'use client';

import { useState } from 'react';
import {
  AlertCircle,
  HistoryIcon,
  ThermometerIcon,
  WifiIcon,
} from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const data = [
  { time: '13:00', temperature: 45 },
  { time: '14:00', temperature: 47 },
  { time: '15:00', temperature: 51 },
  { time: '16:00', temperature: 49 },
  { time: '17:00', temperature: 38 },
  { time: '18:00', temperature: 30 },
];

export function DeviceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('1h');

  return (
    <div className="min-h-screen space-y-6 bg-background px-6 py-2">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              <ThermometerIcon className="mr-2 inline h-4 w-4" /> Temperature
              Overview
            </CardTitle>
            <Tabs
              defaultValue={selectedPeriod}
              onValueChange={setSelectedPeriod}
            >
              <TabsList className="grid h-8 w-full grid-cols-5">
                {['1h', '12h', '24h', '7d', '1M'].map((period) => (
                  <TabsTrigger key={period} value={period} className="text-xs">
                    {period}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <WifiIcon className="h-4 w-4 text-green-500" />
                <div>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/10 text-xs text-green-500"
                  >
                    Online
                  </Badge>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Status: Normal
                  </p>
                </div>
              </div>
              <div className="text-right">
                <CardDescription>Current Temp.</CardDescription>
                <CardTitle>30°C</CardTitle>
              </div>
            </div>
            <ChartContainer
              config={{
                temperature: {
                  label: 'Temperature',
                  color: 'hsl(var(--primary))',
                },
              }}
            >
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-muted/30"
                />
                <XAxis
                  dataKey="time"
                  className="text-xs text-muted-foreground"
                />
                <YAxis className="text-xs text-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="var(--color-temperature)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              <AlertCircle className="mr-2 inline h-4 w-4" /> Alert Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea>
              <div className="space-y-2 pr-4">
                {[
                  { temp: 30, time: '18:00:00', type: 'Low' },
                  { temp: 51, time: '15:00:00', type: 'High' },
                  { temp: 28, time: '12:00:00', type: 'Low' },
                  { temp: 53, time: '09:00:00', type: 'High' },
                ].map((alert, index) => (
                  <Card
                    key={index}
                    className={`bg-${alert.type === 'Low' ? 'blue' : 'red'}-500/10`}
                  >
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm">
                        Critical {alert.type}: {alert.temp} °C
                      </CardTitle>
                      <CardDescription className="text-xs">
                        2024-10-24 {alert.time}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            <HistoryIcon className="mr-2 inline h-4 w-4" /> Temperature History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Timestamp</TableHead>
                <TableHead>Temperature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-muted-foreground">{`2024-10-24 ${row.time}:00.00000+07:00`}</TableCell>
                  <TableCell className="font-medium">{`${row.temperature} °C`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" size="icon">
            <span className="sr-only">Go to first page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m11 17-5-5 5-5" />
              <path d="m18 17-5-5 5-5" />
            </svg>
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Go to previous page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Go to next page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Go to last page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m13 17 5-5-5-5" />
              <path d="m6 17 5-5-5-5" />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
