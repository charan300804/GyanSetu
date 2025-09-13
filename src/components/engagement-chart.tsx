"use client";

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { getEngagementData } from '@/lib/data';

const chartConfig = {
  active: {
    label: 'Active Students',
    color: 'hsl(var(--chart-1))',
  },
  completed: {
    label: 'Lessons Completed',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function EngagementChart() {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    getEngagementData().then(data => setChartData(data as any));
  }, []);

  if (!chartData.length) {
    return <div className="flex h-[350px] w-full items-center justify-center">Loading chart...</div>;
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="active" fill="var(--color-active)" radius={4} />
        <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
