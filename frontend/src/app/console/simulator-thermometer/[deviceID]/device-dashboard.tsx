'use client';

import { useListThermometerHistory } from '@/services/thermometer/listThermometer.query';
import NumberFlow from '@number-flow/react';
import {
  AlertCircle,
  HistoryIcon,
  InfoIcon,
  ThermometerIcon,
  WifiIcon,
} from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function DeviceDashboard({ deviceID }: { deviceID: string }) {
  const { data: thermometerHistories } = useListThermometerHistory(
    deviceID,
    {
      refetchInterval: 3000,
    }
  );

  const data =
    thermometerHistories?.data?.map((history) => ({
      time: history.timestamp,
      temperature: history.temperature,
    })) || [];

  const lastTemp = data[0]?.temperature;

  return (
    <div className="h-fit space-y-6 bg-background px-6 py-2">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              <AlertCircle className="mr-2 inline h-4 w-4" /> Current Temp.
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[320px] content-center text-center ~text-4xl/3xl">
            {lastTemp !== undefined ? (
              <>
                <NumberFlow value={lastTemp} /> °C
              </>
            ) : (
              '-'
            )}
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              <ThermometerIcon className="mr-2 inline h-4 w-4" />
              Temperature Overview
              <span className="gap-2 px-2">
                <Badge
                  variant="secondary"
                  className="gap-1 text-xs text-primary"
                >
                  <WifiIcon className="h-3 w-3" />
                  Online
                </Badge>
                <Badge
                  variant="secondary"
                  className="gap-1 text-xs text-primary"
                >
                  <InfoIcon className="h-3 w-3" />
                  Normal
                </Badge>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="max-h-[250px] w-full"
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
                  type="category"
                  dataKey="time"
                  className="text-xs text-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleTimeString('en-US', {
                      timeZone: 'Asia/Bangkok',
                      timeStyle: 'medium',
                      hour12: false,
                    });
                  }}
                  reversed
                />
                <YAxis
                  className="text-xs text-muted-foreground"
                  domain={[0, 100]}
                  allowDataOverflow
                  interval="preserveStartEnd"
                />
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
              {data.length === 0 ? (
                <TableRow className="h-40">
                  <TableCell colSpan={2} className="text-center">
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-muted-foreground">{`2024-10-24 ${row.time}:00.00000+07:00`}</TableCell>
                    <TableCell className="font-medium">{`${row.temperature} °C`}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
