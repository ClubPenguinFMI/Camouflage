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
      { id: "a1", name: "Apple", percentage: 35 },
      { id: "a2", name: "Microsoft", percentage: 25 },
      { id: "a3", name: "Nvidia", percentage: 20 },
      { id: "a4", name: "Cash", percentage: 20 },
    ]);
  },
  getAssetDependencies(): Promise<Dependency[]> {
    return Promise.resolve([
      { id: "n1", name: "Dependency 1", percentage: 50 },
      { id: "n2", name: "Dependency 2", percentage: 30 },
      { id: "n3", name: "Dependency 3", percentage: 20 },
      { id: "n4", name: "Dependency 4", percentage: 10 },
      { id: "n5", name: "Dependency 5", percentage: 5 },
      { id: "n6", name: "Dependency 6", percentage: 2 },
      { id: "n7", name: "Dependency 7", percentage: 1 },
      { id: "n8", name: "Dependency 8", percentage: 0.5 },
      { id: "n9", name: "Dependency 9", percentage: 0.2 },
      { id: "n10", name: "Dependency 10", percentage: 0.1 },
      { id: "n11", name: "Dependency 11", percentage: 0.05 },
      { id: "n12", name: "Dependency 12", percentage: 0.01 },
      { id: "n12", name: "Dependency 12", percentage: 80 },
    ]);
  },
};

export const graph = {
  getNotes(): Promise<GraphNode[]> {
    return Promise.resolve([
      { id: "n1", label: "Apple" },
      { id: "n2", label: "TSMC" },
      { id: "n3", label: "China exposure" },
    ]);
  },

  getEdges(): Promise<GraphEdge[]> {
    return Promise.resolve([
      { id: "e1", source: "n1", target: "n2", type: EdgeType.DEPENDS_ON },
      { id: "e2", source: "n2", target: "n3", type: EdgeType.EXPOSED_TO },
    ]);
  },
};
