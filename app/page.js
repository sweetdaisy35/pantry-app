import { Box, Button, Typography } from "@mui/material";
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/pantry-image.jpg)', // Gradient overlay
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        backgroundColor: 'white'
      }}
    >
    {/* Horizontal Box */}
    <Box
      sx={{
        width: '100%',
        height: '60px',  // Adjust the height as needed
        backgroundColor: '#ff009d', // Same color as h1 text
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />

      <Typography variant="h1" sx={{ color: '#ff009d', fontFamily: 'Dancing Script, cursive', mt: '60px' }}>
        PantryPro
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.25rem' }} mt={1}>
        Your ultimate sidekick for a perfectly organized kitchen.
      </Typography>
      <Link href="/about">
        <Button variant="contained"
        sx={{
          mt: 5,
          backgroundColor: '#ff009d',  // Set the background color
          '&:hover': {
            backgroundColor: '#e60088',  // Darken the color slightly on hover
          }
        }}
      >
          Get Started
        </Button>
      </Link>
      <Box position="absolute" bottom={0} width="100%" textAlign="center" padding={2} >
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} PantryPro. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
