import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Asset } from "../../../../sdk/interfaces";

const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#d32f2f",
  "#9c27b0",
  "#0288d1",
  "#5d4037",
  "#455a64",
];

const AssetsChart = ({ assets }: { assets: Asset[] }) => {
  const chartData = assets.map((asset) => ({
    name: asset.ticker,
    value: asset.percentage,
    invested: asset.valueInvested,
    quantity: asset.quantity,
  }));

  if (!assets.length) {
    return <div>No assets to display.</div>;
  }

  return (
    <div style={{ width: "100%", height: 520 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={180}
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, _name, props) => [
              `${value}%`,
              props.payload.name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetsChart;
