import { BasicNvlWrapper } from "@neo4j-nvl/react";
import { ForceDirectedLayoutType, type NvlOptions } from "@neo4j-nvl/base";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { graph as graphSdk } from "../../sdk";
import type { GraphEdge, GraphNode } from "../../sdk/interfaces";
import { buildGraphData } from "../../utils/graph";

const Graph = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [notesData, edgesData] = await Promise.all([
          graphSdk.getNotes(),
          graphSdk.getEdges(),
        ]);

        setNodes(notesData);
        setEdges(edgesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  const graphData = useMemo(() => buildGraphData(nodes, edges), [nodes, edges]);

  const options: NvlOptions = {
    layout: ForceDirectedLayoutType,
    initialZoom: 0.7,
    disableTelemetry: true,
    disableWebWorkers: true,
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "grey.50",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Dependency Graph
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Visual map of portfolio dependencies and exposures
          </Typography>
        </Box>

        <Box
          sx={{
            height: 520,
            position: "relative",
            background:
              "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)",
          }}
        >
          {loading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                backgroundColor: "rgba(255,255,255,0.75)",
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {!loading && error && (
            <Box sx={{ p: 3 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}

          {!loading && !error && (
            <BasicNvlWrapper
              nodes={graphData.nodes}
              rels={graphData.edges}
              nvlOptions={options}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Graph;
