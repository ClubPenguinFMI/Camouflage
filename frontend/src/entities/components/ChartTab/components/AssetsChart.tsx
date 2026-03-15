import {
  PieChart,
  Pie,
  Cell,
  Tooltip as CharTooltip,
  ResponsiveContainer,
} from "recharts";
import type { Portfolio } from "../../../../sdk/interfaces";
import { Box, Typography, Tooltip } from "@mui/material";

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

const AssetsChart = ({ assets }: { assets: Portfolio[] }) => {
  const chartData = assets.map((asset) => ({
    shortName: asset.ticker,
    longName: asset.name,
    value: Number(asset.percentage.toFixed(2)),
    invested: asset.valueInvested,
    quantity: asset.quantity,
  }));

  if (!assets.length) {
    return <div>No assets to display.</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "85vh",
      }}
    >
      <Box
        sx={{
          width: 420,
          height: "100%",
          flexShrink: 0,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={170}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.shortName}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <CharTooltip
              formatter={(value, _name, props) => [
                `${value}%`,
                props.payload.shortName,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box
        sx={{
          ml: 6,
          width: 280,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 2,
          rowGap: 1,
          alignContent: "center",
        }}
      >
        {chartData.map((entry, index) => (
          <Box
            key={entry.shortName}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: COLORS[index % COLORS.length],
                flexShrink: 0,
              }}
            />
            <Tooltip title={entry.longName} placement="top" disableInteractive={!entry.longName}>
              <Typography variant="body2" noWrap>
                {entry.shortName} - {Math.abs(entry.value).toFixed(0)}%
              </Typography>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AssetsChart;
