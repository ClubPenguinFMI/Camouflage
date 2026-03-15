import type { Portfolio } from "../../../../sdk/interfaces";
import AssetItem from "./AssetItem";
import ItemsList from "../../ItemsList";

const AssetsList = ({ assets }: { assets: Portfolio[] }) => {
  return (
    <ItemsList itemsCount={assets.length} title="Assets">
      <>
        {assets
          .sort((a, b) => b.percentage - a.percentage)
          .map((asset) => (
            <AssetItem key={asset.ticker} asset={asset} />
          ))}</>
    </ItemsList>
  )
};

export default AssetsList;
