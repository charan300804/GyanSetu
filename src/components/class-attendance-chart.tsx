"use client";

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  ChartConfig,
} from '@/components/ui/chart';
import { getStudents } from '@/lib/data';
import { Student } from '@/lib/types';

const chartConfig = {
  attendance: {
    label: 'Attendance',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ClassAttendanceChart() {
  const [chartData, setChartData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchData() {
        const students = await getStudents();
        const data = students.map(student => ({
            name: student.name.split(' ')[0], // Use first name for brevity
            attendance: student.attendance,
        }));
        setChartData(data);
    }
    fetchData();
  }, []);

  if (!chartData.length) {
    return <div className="flex h-[250px] w-full items-center justify-center">Loading chart...</div>;
  }

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis unit="%" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
            }}
          />
          <Bar dataKey="attendance" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}