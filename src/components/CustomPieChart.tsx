import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type CustomPieChartProps = {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  label?: string;
  totalAmount?: number | string;
};

const CustomPieChart = ({ data, colors, label, totalAmount }: CustomPieChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="card p-4 bg-white shadow-sm rounded border border-gray-200">
        <h4 className="text-lg font-semibold mb-4">{label || 'Distribution'}</h4>
        <div className="w-full h-80 flex items-center justify-center text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  // Calculate total if not provided
  const total = totalAmount !== undefined 
    ? totalAmount 
    : data.reduce((sum, item) => sum + item.value, 0);

  // Default colors for pie slices
  const COLORS = colors || [
    '#9333ea', // purple
    '#ea580c', // orange
    '#10b981', // emerald
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f97316', // orange alt
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-sm font-medium text-gray-800">{data.name}</p>
          <p className="text-sm font-semibold text-purple-600">
            {data.value} items
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-4 bg-white shadow-sm rounded border border-gray-200">
      <h4 className="text-lg font-semibold mb-4">{label || 'Distribution'}</h4>
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
            strokeWidth={2}
            stroke="#fff"
            label={({ name, value }) => `${value}`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{ paddingTop: '20px' }}
          />
          {/* Center label */}
          <text x="50%" y="40%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="-10" className="text-sm font-medium fill-gray-600">
              {label?.replace(' Distribution', '') || 'Total'}
            </tspan>
            <tspan x="50%" dy="30" className="text-2xl font-bold fill-gray-900">
              {total}
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
