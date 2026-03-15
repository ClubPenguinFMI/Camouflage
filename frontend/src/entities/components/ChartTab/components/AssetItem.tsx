import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Portfolio } from "../../../../sdk/interfaces";
import { useMemo } from "react";
import Tooltip from "@mui/material/Tooltip";

const AssetItem = ({ asset }: { asset: Portfolio }) => {
  const percentageColor = useMemo(
    () => (asset.percentage > 50 ? "error.main" : "primary.main"),
    [asset.percentage],
  );

  return (
    <Box className="flex items-center gap-2 py-1">
      <Box className="flex items-center justify-between w-[70%]">
        <Box className="flex items-center gap-2">
          <Box
            className="rounded-full"
            sx={{
              width: 12,
              height: 12,
              backgroundColor: "primary.main",
            }}
          />
          <Tooltip title={asset.ticker.longName} placement="top" disableInteractive={!asset.ticker.longName}>
            <Typography variant="body2" color="text.primary">
              {asset.ticker.shortName}
            </Typography>
          </Tooltip>
        </Box>

        <Typography variant="body2" color="text.secondary">
          €{Number(asset.valueInvested.toFixed(2))}
        </Typography>
      </Box>
      <Box className="flex items-center justify-end">
        <Typography variant="body1" fontWeight="bold" color={percentageColor}>
          {Number(asset.percentage.toFixed(2))} %
        </Typography>
      </Box>
    </Box>
  );
};

export default AssetItem;
