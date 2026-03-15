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
): { nodes: Node[]; edges: Relationship[] } {
  return {
    nodes: nodes.map((node) => ({
      id: node.properties.ticker as string,
      caption: node.properties.ticker as string,
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
