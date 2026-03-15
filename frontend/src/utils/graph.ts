import type { Node, Relationship } from "@neo4j-nvl/base";
import type { GraphEdge, GraphNode } from "../sdk/interfaces";

function formatEdgeLabel(type?: string) {
  if (!type) return "";

  switch (type) {
    case "depends_on":
      return "Depends on";
    case "owns":
      return "Owns";
    case "supplies":
      return "Supplies";
    case "exposed_to":
      return "Exposed to";
    default:
      return type.replaceAll("_", " ");
  }
}

export function buildGraphData(
  nodes: GraphNode[],
  edges: GraphEdge[],
  portfolioValues: string[]
): { nodes: Node[]; edges: Relationship[] } {
  return {
    nodes: nodes.map((node) => ({
      id: node.properties.ticker as string,
      caption: node.properties.ticker as string,
      color: node.color,
      size: 32 + (portfolioValues.includes(node.properties.ticker as string) ? 20 : 0),
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      from: edge.source,
      to: edge.target,
      caption: ""// formatEdgeLabel(edge.type),
    })),
  };
}

export const setColorsForNodes = (
  nodes: GraphNode[],
  correlations: Map<string, number>,
  portfolioCorrelations: Map<string, number>
): GraphNode[] => {
  return nodes.map(node => {
    const ticker = node.properties.ticker as string;
    const correlation =
      correlations.get(ticker) ?? portfolioCorrelations.get(ticker) ?? 0;

    return {
      ...node,
      color: calculateCorrelationColor(correlation * 100)
    };
  });
};


export const calculateCorrelationColor = (percent: number): string => {
  percent = Math.abs(percent)
  const clamped = Math.max(0, Math.min(100, percent));

  const red = 255;
  const green = Math.round(200 * (1 - clamped / 100));
  const blue = 50;

  const toHex = (value: number) => value.toString(16).padStart(2, "0");

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
};