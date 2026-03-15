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
              backgroundColor: percentageColor,
            }}
          />
          <Tooltip title={asset.name} placement="top" disableInteractive={!asset.name}>
            <Typography variant="body2" color="text.primary">
              {asset.ticker}
            </Typography>
          </Tooltip>
        </Box>

        <Typography variant="body2" color="text.secondary">
          €{Number(Math.abs(asset.valueInvested).toFixed(2))}
        </Typography>
      </Box>
      <Box className="flex items-center justify-end">
        <Typography variant="body1" fontWeight="bold" color={percentageColor}>
          {Number(Math.abs(asset.percentage).toFixed(2))} %
        </Typography>
      </Box>
    </Box>
  );
};

export default AssetItem;
