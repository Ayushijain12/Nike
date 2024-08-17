import { createTheme } from '@mui/material/styles';

// Define your theme
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#8B0000', // Custom primary color
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#8B0000', // Custom AppBar background color
                },
            },
        },
    },
});

// Export your theme
export default defaultTheme;
