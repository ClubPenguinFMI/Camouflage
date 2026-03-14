import type { Asset } from "../sdk/interfaces";
export interface AssetChartItem {
  id: string;
  label: string;
  value: number;
}

export function mapAssetsToPieChartData(assets: Asset[]): AssetChartItem[] {
  return assets.map((asset) => ({
    id: asset.ticker,
    label: asset.ticker,
    value: asset.valueInvested,
  }));
}
