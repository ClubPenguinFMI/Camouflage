import Box from "@mui/material/Box"
import { calculateCorrelationColor } from "../../../../utils/graph"
import logoUrl from "../../../../assets/pinguindex.svg";
import { Icon } from "@mui/material";

const Pinguindex = ({ index }: { index?: number }) => {
    const color = calculateCorrelationColor(index || 100)

    return (
        <Box
            sx={{
                position: "fixed",
                right: 16,
                bottom: 16,
                zIndex: 2000,
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
            }}
        >
            <div className="flex flex-row gap-2 items-center">
                <Icon
                    sx={{
                        width: 40,
                        height: 40,
                        p: 0.5,
                    }}
                >
                    <img
                        src={logoUrl}
                        alt="Logo"
                        className="object-contain"
                    /></Icon>
                <div className="text-2xl font-bold tracking-wide">Pinguindex:</div>
                <div className="text-4xl font-bold tracking-wide" style={{ color }}>{(index?.toFixed(2)) || "N/A"} %</div>
            </div>


        </Box>
    )
}
export default Pinguindex