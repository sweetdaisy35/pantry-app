
import { Box, Typography } from "@mui/material";
import Link from 'next/link';

export default function Home() {

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h1">About Us</Typography>
            <Typography variant="body1" mt={2}>
                Welcome to the Pantry App! This app helps you manage your pantry inventory efficiently.
            </Typography>
        </Box>
    );
}
