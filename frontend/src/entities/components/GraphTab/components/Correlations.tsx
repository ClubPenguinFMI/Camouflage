import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import CorrelationItem from "./CorrelationItem";

const Correlations = ({
  correlations,
  focusNode,
}: {
  correlations: Map<string, number>;
  focusNode: (id: string) => void;
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
        Correlations
      </h3>

      {correlations.size === 0 ? (
        <Box className="flex items-center justify-center h-full">
          <Typography variant="body2" color="text.secondary">
            No correlations found.
          </Typography>
        </Box>
      ) : (
        <div className="flex flex-col gap-1 divide-y divide-gray-200">
          {Array.from(correlations)
            .sort((a, b) => b[1] - a[1])
            .map(([ticker, percentage]) => (
              <CorrelationItem
                key={ticker}
                correlations={{ ticker, percentage }}
                focusDependency={focusNode}
              />
            ))}
        </div>
      )}
    </Box>
  );
};

export default Correlations;
