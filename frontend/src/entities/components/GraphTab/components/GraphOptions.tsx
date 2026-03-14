import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const DEFAULT_ZOOM = 0.8;

const GraphOptions = ({
  setZoom,
}: {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.2));
  const handleReset = () => setZoom(DEFAULT_ZOOM);
  return (
    <Stack direction="row" spacing={1} className="justify-between px-2 pt-2">
      <IconButton onClick={handleZoomOut} size="small">
        <RemoveIcon />
      </IconButton>

      <IconButton onClick={handleZoomIn} size="small">
        <AddIcon />
      </IconButton>

      <IconButton onClick={handleReset} size="small">
        <RestartAltIcon />
      </IconButton>
    </Stack>
  );
};

export default GraphOptions;
