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

const NODE_COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#a855f7",
  "#ec4899",
];
export function buildGraphData(
  nodes: GraphNode[],
  edges: GraphEdge[],
): { nodes: Node[]; edges: Relationship[] } {
  return {
    nodes: nodes.map((node) => ({
      id: node.properties.ticker as string,
      caption: node.properties.ticker as string,
      color: node.color,
      size: 32,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      from: edge.source,
      to: edge.target,
      caption: formatEdgeLabel(edge.type),
    })),
  };
}

export const setColorsForNodes = (nodes: GraphNode[]) => {
  const groupedByIndustry: Record<string, GraphNode[]> = {};

  nodes.forEach((node) => {
    const industry = node.properties.sector as string || "Unknown";
    if (!groupedByIndustry[industry]) {
      groupedByIndustry[industry] = [];
    }
    groupedByIndustry[industry].push(node);
  });

  const normalized: GraphNode[] = [];
  Object.values(groupedByIndustry).forEach((group, index) => {
    const color = NODE_COLORS[index % NODE_COLORS.length];
    group.forEach((node) => {
      normalized.push({ ...node, color });
    });
  });

  return normalized;
};

