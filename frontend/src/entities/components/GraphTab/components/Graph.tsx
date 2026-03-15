import { InteractiveNvlWrapper } from "@neo4j-nvl/react";
import { ForceDirectedLayoutType, type NvlOptions } from "@neo4j-nvl/base";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import type {
  GraphEdge,
  GraphNode,
} from "../../../../sdk/interfaces";
import { buildGraphData } from "../../../../utils/graph";
import GraphOptions from "./GraphOptions";
import Correlations from "./Correlations";
const DEFAULT_ZOOM = 0.8;

const Graph = ({
  nodes,
  edges,
  correlations,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  correlations: Map<string, number>;
}) => {
  console.log("Rendering Graph with nodes:", nodes.length, "edges:", edges.length, "correlations:", correlations.size);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const nvlRef = useRef<any>(null);

  useEffect(() => {
    if (!focusNodeId) {
      return;
    }
    nvlRef.current?.fit?.([focusNodeId]);
  }, [focusNodeId]);

  const graphData = useMemo(() => buildGraphData(nodes, edges), [nodes, edges]);

  const options: NvlOptions = {
    layout: ForceDirectedLayoutType,
    initialZoom: DEFAULT_ZOOM,
    disableTelemetry: true,
    disableWebWorkers: true,
    renderer: "canvas",
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 560,
      }}
    >
      <Box
        className="bg-gray-100 rounded-tl-lg"
        sx={{
          width: "20%",
          minWidth: 220,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        {graphData.nodes.length !== 0 && <GraphOptions setZoom={setZoom} />}
        <Correlations
          correlations={correlations}
          focusNode={setFocusNodeId}
        />
      </Box>

      <Box
        sx={{
          width: "80%",
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {graphData.nodes.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}          >
            No graph data available.
          </Box>
        ) : (
          <InteractiveNvlWrapper
            ref={nvlRef}
            nodes={graphData.nodes}
            rels={graphData.edges}
            nvlOptions={options}
            zoom={zoom}
            mouseEventCallbacks={{
              onZoom: true,
              onPan: true,
              onDrag: true,
              onNodeClick: (node) => console.log("Clicked node:", node),
              onRelationshipClick: (rel) =>
                console.log("Clicked relationship:", rel),
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Graph;
