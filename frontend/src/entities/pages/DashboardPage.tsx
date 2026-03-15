import TabsSwitcher from "../components/TabsSwitcher";
import GraphTab from "../components/GraphTab";
import ChartTab from "../components/ChartTab";
import { useEffect, useState } from "react";
import type { Portfolio } from "../../sdk/interfaces";
import { assets as assetsSdk } from "../../sdk";

export default function DashboardPage() {
  const [assets, setAssets] = useState<Portfolio[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [assetsData] = await Promise.all([assetsSdk.getAssets()]);

        setAssets(assetsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  return (
    <TabsSwitcher
      items={[
        {
          label: "Portfolio",
          content: <ChartTab assets={assets} loading={loading} error={error} />,
        },
        {
          label: "Dependencies",
          content: <GraphTab assets={assets} loading={loading} error={error} />,
        },
      ]}
    />
  );
}
