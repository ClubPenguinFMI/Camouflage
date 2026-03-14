import {
  EdgeType,
  type Asset,
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
