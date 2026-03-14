import { useEffect, useState } from "react";
import { Alert, Box, CardContent, CircularProgress } from "@mui/material";
import type { GraphEdge, GraphNode } from "../../../sdk/interfaces";
import { graph as graphSdk } from "../../../sdk";
import GraphVisualization from "./components/GraphVisualization";

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

  return (
    <CardContent className="overflow-hidden" sx={{ p: 0 }}>
      <Box
        sx={{
          height: 560,
          position: "relative",
          background: "#f8fafc",
        }}
      >
        {loading && (
          <Box className="absolute items-center justify-center flex w-full h-full">
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Box sx={{ p: 3 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {!loading && !error && (
          <GraphVisualization nodes={nodes} edges={edges} />
        )}
      </Box>
    </CardContent>
  );
};

export default Graph;
