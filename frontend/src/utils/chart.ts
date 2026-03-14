import type { Asset } from "../sdk/interfaces";
import type { AssetChartItem } from "../assets/Chart";

export function mapAssetsToPieChartData(assets: Asset[]): AssetChartItem[] {
  return assets.map((asset) => ({
    id: asset.id,
    label: asset.name,
    value: asset.percentage,
  }));
}
