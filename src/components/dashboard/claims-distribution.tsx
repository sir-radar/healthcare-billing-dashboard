'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface ClaimsDistributionProps {
  data: { name: string; value: number; total: number }[];
}

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function ClaimsDistribution({ data }: ClaimsDistributionProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Claims Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={(entry) =>
                `${entry.name} - ${entry.percent.toFixed(
                  2
                )}%  - ${formatCurrency(entry.total)}`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => {
                const { payload } = props;
                return [
                  `Total: ${formatCurrency(payload.total)} | ${name}: ${value}`,
                  'Details',
                ];
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
