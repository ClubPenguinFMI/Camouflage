import type { Node, Relationship } from "@neo4j-nvl/base";
import type { GraphEdge, GraphNode } from "../sdk/interfaces";

export function buildGraphData(
  nodes: GraphNode[],
  edges: GraphEdge[],
): { nodes: Node[]; edges: Relationship[] } {
  const nvlNodes: Node[] = nodes.map((node) => ({
    id: node.id,
    label: node.label,
  }));

  const nvlEdges: Relationship[] = edges.map((edge) => ({
    id: edge.id,
    from: edge.source,
    to: edge.target,
    label: edge.type,
  }));

  return {
    nodes: nvlNodes,
    edges: nvlEdges,
  };
}
