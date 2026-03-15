import { Box, Typography } from "@mui/material";

const ItemsList = ({ itemsCount, children, title }: { itemsCount: number, children: React.ReactNode, title: string }) => {
    return (
        <Box
            className="bg-white p-2 flex flex-col h-full"
            sx={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
            }}
        >
            <h3 className="text-lg font-semibold border-b border-gray-400">{title}</h3>

            {itemsCount === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No found {title.toLocaleLowerCase()}.
                </Typography>
            ) : (
                <div className="flex flex-col gap-1 divide-y divide-gray-200">
                    {children}
                </div>
            )}
        </Box>
    );
};

export default ItemsList;
