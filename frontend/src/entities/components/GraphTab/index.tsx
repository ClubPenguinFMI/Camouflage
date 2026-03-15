import { useEffect, useState } from "react";
import type { GraphEdge, GraphNode, Portfolio } from "../../../sdk/interfaces";
import { graph as graphSdk } from "../../../sdk";
import Graph from "./components/Graph";
import TabWrapper from "../TabWrapper";

const GraphTab = ({
  assets,
}: {
  assets: Portfolio[];
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [correlations, setCorrelations] = useState<Map<string, number>>(
    new Map()
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!assets.length) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const graphData = await graphSdk.getGraphData(assets);
        console.log("Graph data received:", graphData);

        setNodes(graphData.nodes ?? []);
        setEdges(graphData.edges ?? []);
        setCorrelations(
          graphData.correlations instanceof Map
            ? graphData.correlations
            : new Map(Object.entries(graphData.correlations ?? {}))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [assets]);

  return (
    <TabWrapper loading={loading} error={error}>
      <Graph nodes={nodes} edges={edges} correlations={correlations} />
    </TabWrapper>
  );
};

export default GraphTab;
