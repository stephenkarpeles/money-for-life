"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import type { InvestmentData } from "../utils/investmentCalculations";

interface InvestmentChartProps {
  data: InvestmentData[];
}

export default function InvestmentChart({ data }: InvestmentChartProps) {
  // Filter data to show key milestones (every 5 years)
  const filteredData = data.filter((d) => d.year % 5 === 0);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            Year {data.year} (Age {data.age})
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Total Invested: {formatCurrency(data.invested)}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            Portfolio Value: {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
            Gains: {formatCurrency(data.value - data.invested)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] sm:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={filteredData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
          <XAxis
            dataKey="year"
            label={{ value: "Years", position: "insideBottom", offset: -5 }}
            className="text-gray-600 dark:text-gray-400"
          />
          <YAxis
            tickFormatter={formatCurrency}
            label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
            className="text-gray-600 dark:text-gray-400"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="invested"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorInvested)"
            name="Total Invested"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#colorValue)"
            name="Portfolio Value"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

