import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Asset } from "../../../../sdk/interfaces";
import { useMemo } from "react";

const AssetItem = ({ asset }: { asset: Asset }) => {
  const percentageColor = useMemo(
    () => (asset.percentage > 50 ? "error.main" : "primary.main"),
    [asset.percentage],
  );

  return (
    <Box className="flex items-center gap-2 py-1">
      <Box className="flex items-center justify-between w-4/5">
        <Box className="flex items-center gap-2">
          <Box
            className="rounded-full"
            sx={{
              width: 12,
              height: 12,
              backgroundColor: "primary.main",
            }}
          />
          <Typography variant="body2" color="text.primary">
            {asset.ticker}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          €{asset.valueInvested}
        </Typography>
      </Box>
      <Box className="flex items-center justify-end w-1/5">
        <Typography variant="body1" fontWeight="bold" color={percentageColor}>
          {asset.percentage} %
        </Typography>
      </Box>
    </Box>
  );
};

export default AssetItem;
