import { useState } from "react";
import type { Portfolio } from "../../sdk/interfaces";
import CredentialsForm from "../components/CredentialsForm";
import Dashboard from "../components/Dashboard";
import Box from "@mui/material/Box";

export default function DashboardPage() {

  const [assets, setAssets] = useState<Portfolio[] | undefined>(undefined);

  return (
    <Box className="w-full h-full min-h-0">
      {assets ? (
        <Dashboard assets={assets} />
      ) : (
        <CredentialsForm setAssets={setAssets} />
      )}
    </Box>)
}
