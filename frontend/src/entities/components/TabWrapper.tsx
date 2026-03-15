import { Alert, Box, CardContent, CircularProgress } from "@mui/material";
import type React from "react";

const TabWrapper = ({
  children,
  loading,
  error,
}: {
  children: React.ReactNode;
  loading: boolean;
  error: string | null;
}) => {
  return (
    <CardContent className="overflow-hidden w-full h-full" sx={{ p: 0 }}>
      <Box
        sx={{
          height: "100%",
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
        {!loading && !error && children}
      </Box>
    </CardContent>
  );
};

export default TabWrapper;
