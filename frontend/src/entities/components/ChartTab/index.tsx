import { useEffect, useState } from "react";
import type { Asset } from "../../../sdk/interfaces";
import { assets as assetsSdk } from "../../../sdk";
import TabWrapper from "../TabWrapper";
import Assets from "./components/Assets";

const ChartTab = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

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
    <TabWrapper loading={loading} error={error}>
      {assets.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No assets found.</p>
        </div>
      ) : (
        <Assets assets={assets} />
      )}
    </TabWrapper>
  );
};

export default ChartTab;
