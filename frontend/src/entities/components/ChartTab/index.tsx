import type { Portfolio } from "../../../sdk/interfaces";
import TabWrapper from "../TabWrapper";
import Assets from "./components/Assets";

const ChartTab = ({ assets }: { assets: Portfolio[]; }) => {
  return (
    <TabWrapper loading={false} error={null}>
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
