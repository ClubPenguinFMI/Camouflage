import { Box } from "@mui/material";
import type { Dependency } from "../../../../sdk/interfaces";
import { Typography } from "@mui/material";
import DependencyItem from "./DependencyItem";

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

export default Dependencies;
