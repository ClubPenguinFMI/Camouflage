import type { Relationship } from "@neo4j-nvl/base/dist/types/types/graph-element";

export interface Asset {
  ticker: string;
  valueInvested: number;
  percentage: number;
  quantity: number;
}

export enum EdgeType {
  DEPENDS_ON = "depends_on",
  OWNS = "owns",
  SUPPLIES = "supplies",
  EXPOSED_TO = "exposed_to",
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type?: EdgeType;
}

export interface GraphNode {
  id: string;
  name: string;
  properties: {
    ticker: string;
    name: string;
    sector: string;
  };
}
export interface GraphData {
  nodes: GraphNode[];
  edges: Relationship[];
}

export interface Dependency {
  id: string;
  ticker: string;
  percentage: number;
}
