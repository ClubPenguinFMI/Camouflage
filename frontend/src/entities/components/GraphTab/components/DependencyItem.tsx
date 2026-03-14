import { useMemo } from "react";
import { Box } from "@mui/material";
import type { Dependency } from "../../../../sdk/interfaces";
import { Typography } from "@mui/material";

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
      <Box className="flex items-center gap-2">
        <Box
          className="rounded-full"
          sx={{
            width: 12,
            height: 12,
            backgroundColor: percentageColor,
          }}
        />
        <Typography variant="body2">{dependency.ticker}</Typography>
      </Box>
      <Typography variant="body1" fontWeight="bold" color={percentageColor}>
        {dependency.percentage} %
      </Typography>
    </Box>
  );
};

export default DependencyItem;
