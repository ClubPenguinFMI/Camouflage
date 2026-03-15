import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

type Credentials = {
    token: string;
    secret: string;
};
import { assets as assetsSdk } from "../../sdk";
import type { Portfolio } from "../../sdk/interfaces";

type CredentialsFormProps = {
    setAssets: Dispatch<SetStateAction<Portfolio[]>>
};

const CredentialsForm = ({
    setAssets
}: CredentialsFormProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState<Credentials>({
        token: "",
        secret: "",
    });

    useEffect(() => {

    }, [credentials]);

    const handleChange = useCallback((field: keyof Credentials) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;

            setCredentials((prev) => ({
                ...prev,
                [field]: value,
            }));
        }, [])


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loadData = async () => {
            if (credentials) {
                try {
                    setLoading(true);
                    setError("");

                    const [assetsData] = await Promise.all([assetsSdk.getAssets(credentials)]);

                    setAssets(assetsData);
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Something went wrong");
                } finally {
                    setLoading(false);
                }
            }
        };

        void loadData();
    };

    const isDisabled = !credentials.token.trim() || !credentials.secret.trim() || loading;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="max-w-md w-full mx-auto mt-20 "
        >
            <Stack spacing={3}>
                <Box className="justify-start flex flex-col items-center">
                    <Typography variant="h5" fontWeight={200} color="text.secondary">
                        Connect Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Enter your credentials to continue.
                    </Typography>
                </Box>

                <TextField
                    label="Token"
                    value={credentials.token}
                    onChange={handleChange("token")}
                    fullWidth
                    required
                    type="password"
                    disabled={loading}
                />

                <TextField
                    label="Secret"
                    value={credentials.secret}
                    onChange={handleChange("secret")}
                    fullWidth
                    required
                    type="password"
                    disabled={loading}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isDisabled}
                    className="border-radius-3 font-weight-600"
                >
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default CredentialsForm;
