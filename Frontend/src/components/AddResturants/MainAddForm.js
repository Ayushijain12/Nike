import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import AppBarComponent from '../CustomComponents/AppBarComponent';
import DrawerComponent from '../CustomComponents/DrawerComponent';
import MainContent from './MainContent';
import defaultTheme from '../CustomComponents/defaultTheme'; // Assuming you have a defaultTheme
import { useNavigate } from 'react-router-dom';


const MyApp = () => {

    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();


    const user = localStorage.getItem('user');
    const UserArray = JSON.parse(user);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handlenavigate = () => {
        navigate('/dashboard');
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarComponent
                    open={open}
                    toggleDrawer={toggleDrawer}
                    username={UserArray.username}
                />
                <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
                <MainContent handlenavigate={handlenavigate}  />
            </Box>
        </ThemeProvider>
    );
};

export default MyApp;
