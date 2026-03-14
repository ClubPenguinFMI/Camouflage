import { useEffect, useState } from "react";
import type { Dependency, GraphEdge, GraphNode } from "../../../sdk/interfaces";
import { graph as graphSdk, assets as assetsSdk } from "../../../sdk";
import Graph from "./components/Graph";
import TabWrapper from "../TabWrapper";

const GraphTab = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [dependencies, setDependencies] = useState<Dependency[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [graphData, dependenciesData] = await Promise.all([
          graphSdk.getGraphData(),
          assetsSdk.getAssetDependencies(),
        ]);

        setNodes(graphData.nodes);
        setEdges(graphData.edges);
        setDependencies(dependenciesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  return (
    <TabWrapper loading={loading} error={error}>
      <Graph nodes={nodes} edges={edges} dependencies={dependencies} />
    </TabWrapper>
  );
};

export default GraphTab;
