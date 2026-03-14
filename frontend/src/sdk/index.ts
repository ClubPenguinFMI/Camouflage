import {
  EdgeType,
  type Asset,
  type Dependency,
  type GraphEdge,
  type GraphNode,
} from "./interfaces";

export const assets = {
  getAssets(): Promise<Asset[]> {
    return Promise.resolve([
      { ticker: "AAPL", valueInvested: 10000, percentage: 50, quantity: 50 },
      { ticker: "TSM", valueInvested: 5000, percentage: 25, quantity: 100 },
      { ticker: "CHINA", valueInvested: 3000, percentage: 15, quantity: 150 },
      { ticker: "OTHER", valueInvested: 2000, percentage: 10, quantity: 200 },
    ]);
  },
  getAssetDependencies(): Promise<Dependency[]> {
    return Promise.resolve([
      { id: "n1", ticker: "AAPL", percentage: 50 },
      { id: "n2", ticker: "TSM", percentage: 25 },
      { id: "n3", ticker: "CHINA", percentage: 15 },
    ]);
  },
};

export const graph = {
  getGraphData(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
    const nodes: GraphNode[] = [
      {
        id: "n1",
        name: "Apple",
        properties: {
          ticker: "AAPL",
          name: "Apple Inc.",
          sector: "Technology",
        },
      },
      {
        id: "n2",
        name: "TSMC",
        properties: {
          ticker: "TSM",
          name: "Taiwan Semiconductor Manufacturing Company",
          sector: "Technology",
        },
      },
      {
        id: "n3",
        name: "China exposure",
        properties: {
          ticker: "CHINA",
          name: "China Exposure",
          sector: "Emerging Markets",
        },
      },
    ];

    const edges: GraphEdge[] = [
      { id: "e1", source: "n1", target: "n2", type: EdgeType.DEPENDS_ON },
      { id: "e2", source: "n2", target: "n3", type: EdgeType.EXPOSED_TO },
    ];

    return Promise.resolve({ nodes, edges });
  },
};
