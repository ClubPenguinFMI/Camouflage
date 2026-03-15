import type { Portfolio } from "../../../../sdk/interfaces";
import { Box } from "@mui/material";
import AssetsChart from "./AssetsChart";
import AssetsList from "./AssetsList";

const Assets = ({ assets }: { assets: Portfolio[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 560,
      }}
    >
      <Box
        className="bg-gray-100 rounded-tl-lg"
        sx={{
          width: "20%",
          minWidth: 220,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <AssetsList assets={assets} />
      </Box>

      <Box
        sx={{
          width: "80%",
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <AssetsChart assets={assets} />
      </Box>
    </Box>
  );
};

export default Assets;
