export interface Portfolio {
  ticker: string;
  name: string | undefined;
  valueInvested: number;
  percentage: number;
  quantity: number;
}


export class GraphNode {
  id!: string;
  name!: string;
  properties!: Record<string, unknown>;
  color?: string;
}

export class GraphEdge {
  id!: string;
  source!: string;
  target!: string;
  type!: string;
  properties!: Record<string, unknown>;
}

export class GraphResponse {
  nodes!: GraphNode[];
  edges!: GraphEdge[];
  correlations!: Map<string, number>;
  portfolioCorrelations!: Map<string, number>;
}

export type Credentials = {
  token: string;
  secret: string;
};