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
          <p className="font-semibold text-gray-900 dark:text-white mb-3">
            Age {data.age} (Year {data.year})
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
            Total Invested: {formatCurrency(data.invested)}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">
            Gains: {formatCurrency(data.value - data.invested)}
          </p>
          <p className="text-base font-bold text-green-600 dark:text-green-400">
            Portfolio Value: {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[500px] sm:h-[600px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <defs>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            className="stroke-gray-300 dark:stroke-gray-700" 
            opacity={0.3}
          />
          <XAxis
            dataKey="age"
            label={{ 
              value: "Your Age", 
              position: "insideBottom", 
              offset: -10,
              style: { fontSize: '14px', fontWeight: 600 }
            }}
            className="text-gray-600 dark:text-gray-400"
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            tickFormatter={formatCurrency}
            label={{ 
              value: "Portfolio Value", 
              angle: -90, 
              position: "insideLeft",
              style: { fontSize: '14px', fontWeight: 600 }
            }}
            className="text-gray-600 dark:text-gray-400"
            tick={{ fontSize: 12 }}
            tickMargin={10}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              paddingTop: '30px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 600
            }}
            iconSize={14}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="invested"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorInvested)"
            name="Total Invested"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#colorValue)"
            name="Portfolio Value"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

