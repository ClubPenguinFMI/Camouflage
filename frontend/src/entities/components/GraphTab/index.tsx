import { useEffect, useState } from "react";
import type { GraphEdge, GraphNode, Portfolio } from "../../../sdk/interfaces";
import { graph as graphSdk } from "../../../sdk";
import Graph from "./components/Graph";
import TabWrapper from "../TabWrapper";
import { setColorsForNodes } from "../../../utils/graph";
import Pinguindex from "./components/Pinguindex";

const GraphTab = ({
  assets,
}: {
  assets: Portfolio[];
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [correlations, setCorrelations] = useState<Map<string, number>>(
    new Map()
  );
  const [portfolioCorrelations, setPortfolioCorrelation] = useState<Map<string, number>>(
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

        const correlationsMap =
          graphData.correlations instanceof Map
            ? graphData.correlations
            : new Map(
              Object.entries(graphData.correlations ?? {}) as [string, number][]
            );

        const portfolioCorrelationsMap =
          graphData.portfolioCorrelations instanceof Map
            ? graphData.portfolioCorrelations
            : new Map(
              Object.entries(graphData.portfolioCorrelations ?? {}) as [string, number][]
            );

        setIndex(graphData.portfolioDiversificationIndex * 100)
        setNodes(setColorsForNodes(graphData.nodes, correlationsMap, portfolioCorrelationsMap));
        setEdges(graphData.edges ?? []);
        setCorrelations(correlationsMap);
        setPortfolioCorrelation(portfolioCorrelationsMap);
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
      <Graph nodes={nodes} edges={edges} correlations={correlations} portfolioCorrelation={portfolioCorrelations} />
      <Pinguindex index={index} />
    </TabWrapper>
  );
};

export default GraphTab;
