import { InteractiveNvlWrapper } from "@neo4j-nvl/react";
import { ForceDirectedLayoutType, type NvlOptions } from "@neo4j-nvl/base";
import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import type { GraphEdge, GraphNode } from "../../../../sdk/interfaces";
import { buildGraphData } from "../../../../utils/graph";
import GraphOptions from "./GraphOptions";

const DEFAULT_ZOOM = 0.8;
const GraphVisualization = ({
  nodes,
  edges,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
}) => {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

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
        className="bg-gray-100 p-2 rounded-tl-lg"
        sx={{
          width: "20%",
          minWidth: 220,
        }}
      >
        <GraphOptions setZoom={setZoom} />
      </Box>

      <Box
        sx={{
          width: "80%",
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <InteractiveNvlWrapper
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
      </Box>
    </Box>
  );
};

export default GraphVisualization;
