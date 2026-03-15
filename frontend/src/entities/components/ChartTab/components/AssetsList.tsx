import type { Portfolio } from "../../../../sdk/interfaces";
import { Box, Typography } from "@mui/material";
import AssetItem from "./AssetItem";

const AssetsList = ({ assets }: { assets: Portfolio[] }) => {
  return (
    <Box
      className="bg-white p-2 flex flex-col"
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
      }}
    >
      <h3 className="text-lg font-semibold border-b border-gray-400">Assets</h3>

      {assets.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No assets found.
        </Typography>
      ) : (
        <div className="flex flex-col gap-1 divide-y divide-gray-200">
          {assets
            .sort((a, b) => b.percentage - a.percentage)
            .map((asset) => (
              <AssetItem key={asset.ticker} asset={asset} />
            ))}
        </div>
      )}
    </Box>
  );
};

export default AssetsList;
