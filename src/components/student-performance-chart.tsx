"use client";

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import {
  ChartConfig,
} from '@/components/ui/chart';
import { getStudents } from '@/lib/data';
import { Student } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const chartConfig = {
  excellent: {
    label: 'Excellent (90-100%)',
    color: 'hsl(var(--chart-1))',
  },
  good: {
    label: 'Good (80-89%)',
    color: 'hsl(var(--chart-2))',
  },
  average: {
    label: 'Average (70-79%)',
    color: 'hsl(var(--chart-3))',
  },
  needsImprovement: {
    label: 'Needs Improvement (<70%)',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

const COLORS = [
    chartConfig.excellent.color,
    chartConfig.good.color,
    chartConfig.average.color,
    chartConfig.needsImprovement.color
];

export function StudentPerformanceChart() {
  const [chartData, setChartData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchData() {
        const students = await getStudents();
        const performanceDistribution = {
            excellent: 0,
            good: 0,
            average: 0,
            needsImprovement: 0,
        };

        students.forEach(student => {
            if (student.overallScore >= 90) {
                performanceDistribution.excellent++;
            } else if (student.overallScore >= 80) {
                performanceDistribution.good++;
            } else if (student.overallScore >= 70) {
                performanceDistribution.average++;
            } else {
                performanceDistribution.needsImprovement++;
            }
        });

        const data = [
            { name: 'Excellent', value: performanceDistribution.excellent },
            { name: 'Good', value: performanceDistribution.good },
            { name: 'Average', value: performanceDistribution.average },
            { name: 'Needs Improvement', value: performanceDistribution.needsImprovement },
        ].filter(d => d.value > 0);
        
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
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                        return (
                            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                {`${(percent * 100).toFixed(0)}%`}
                            </text>
                        );
                    }}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend
                    formatter={(value, entry: any) => {
                        const configKey = value.toLowerCase().replace(/ /g, '');
                        if(chartConfig[configKey as keyof typeof chartConfig]) {
                             return chartConfig[configKey as keyof typeof chartConfig].label;
                        }
                        return value;
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
}