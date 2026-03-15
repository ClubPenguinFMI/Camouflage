import { useEffect, useState } from "react";
import type { Credentials, Portfolio } from "../../sdk/interfaces";
import CredentialsForm from "../components/CredentialsForm";
import Dashboard from "../components/Dashboard";
import Box from "@mui/material/Box";

export default function DashboardPage() {
  const [credentials, setCredentials] = useState<Credentials | undefined>(undefined);

  const [assets, setAssets] = useState<Portfolio[]>([]);




  return (
    <Box className="w-full h-full min-h-0">
      {assets ? (
        <Dashboard assets={assets} />
      ) : (
        <CredentialsForm setAssets={setAssets} />
      )}
    </Box>)
}
