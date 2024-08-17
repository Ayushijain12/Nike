// MainContent.js
import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Listview from '../ListComponet/Listview';
import Toolbar from '@mui/material/Toolbar';


const MainContent = ({ handlenavigate }) => {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Grid container spacing={6} style={{ padding: '10px' }}>
                <Grid item xs={6}>
                    <Typography variant="h4" component="div">
                        {"Restaurants Lists"}
                    </Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handlenavigate}>
                        <AddIcon style={{ margin: '5px' }} />
                        Add restaurant
                    </Button>
                </Grid>
                <Grid item xs={12} style={{ padding: '10px 10px 0px 50px' }}>
                    <Listview />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MainContent;
