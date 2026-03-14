import type { Relationship } from "@neo4j-nvl/base/dist/types/types/graph-element";

export interface Asset {
  id: string;
  name: string;
  percentage: number;
  value?: number;
  category?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type?: string;
  description?: string;
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

export interface GraphData {
  nodes: GraphNode[];
  edges: Relationship[];
}

export interface Dependency {
  id: string;
  name: string;
  percentage: number;
}
