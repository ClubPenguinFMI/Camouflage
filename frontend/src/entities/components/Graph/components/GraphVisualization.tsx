import { InteractiveNvlWrapper } from "@neo4j-nvl/react";
import { ForceDirectedLayoutType, type NvlOptions } from "@neo4j-nvl/base";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import type {
  Dependency,
  GraphEdge,
  GraphNode,
} from "../../../../sdk/interfaces";
import { buildGraphData } from "../../../../utils/graph";
import GraphOptions from "./GraphOptions";
import { Typography } from "@mui/material";
const DEFAULT_ZOOM = 0.8;

const DependencyItem = ({
  dependency,
  focusDependency,
}: {
  dependency: Dependency;
  focusDependency: (id: string) => void;
}) => {
  const percentageColor = useMemo(() => {
    return dependency.percentage >= 75
      ? "error.main"
      : dependency.percentage >= 50
        ? "warning.main"
        : "success.main";
  }, [dependency.percentage]);

  return (
    <Box
      className="py-2 flex items-center justify-between cursor-pointer"
      onClick={() => focusDependency(dependency.id)}
    >
      <Typography variant="body2">{dependency.ticker}</Typography>
      <Typography variant="body1" fontWeight="bold" color={percentageColor}>
        {dependency.percentage} %
      </Typography>
    </Box>
  );
};
const Dependencies = ({
  dependencies,
  focusDependency,
}: {
  dependencies: Dependency[];
  focusDependency: (id: string) => void;
}) => {
  return (
    <Box
      className="bg-white p-2 flex flex-col"
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
      }}
    >
      <h3 className="text-lg font-semibold border-b border-gray-400">
        Dependencies
      </h3>

      {dependencies.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No dependencies found.
        </Typography>
      ) : (
        <div className="flex flex-col gap-1 divide-y divide-gray-200">
          {dependencies
            .sort((a, b) => b.percentage - a.percentage)
            .map((dependency) => (
              <DependencyItem
                key={dependency.id}
                dependency={dependency}
                focusDependency={focusDependency}
              />
            ))}
        </div>
      )}
    </Box>
  );
};
const GraphVisualization = ({
  nodes,
  edges,
  dependencies,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  dependencies: Dependency[];
}) => {
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
        <GraphOptions setZoom={setZoom} />
        <Dependencies
          dependencies={dependencies}
          focusDependency={setFocusNodeId}
        />
      </Box>

      <Box
        sx={{
          width: "80%",
          flexGrow: 1,
          minWidth: 0,
        }}
      >
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
      </Box>
    </Box>
  );
};

export default GraphVisualization;
