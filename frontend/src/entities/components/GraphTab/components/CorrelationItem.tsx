import { useMemo } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { calculateCorrelationColor } from "../../../../utils/graph";

const CorrelationItem = ({
  correlations,
  focusDependency,
}: {
  correlations: { percentage: number; ticker: string };
  focusDependency: (ticker: string) => void;
}) => {
  const percentageColor = useMemo(
    () => calculateCorrelationColor(correlations.percentage),
    [correlations.percentage]
  );

  return (
    <Box
      className="py-2 flex items-center justify-between cursor-pointer"
      onClick={() => focusDependency(correlations.ticker)}
    >
      <Box className="flex items-center gap-2">
        <Box
          className="rounded-full"
          sx={{
            width: 12,
            height: 12,
            backgroundColor: percentageColor,
          }}
        />
        <Typography variant="body2">{correlations.ticker}</Typography>
      </Box>
      <Typography variant="body1" fontWeight="bold" color={percentageColor}>
        {Math.abs(correlations.percentage).toFixed(2)} %
      </Typography>
    </Box>
  );
};

export default CorrelationItem;
