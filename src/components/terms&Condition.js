import React from 'react';
import { Checkbox, FormControlLabel, Button, Grid, Typography, Box, Paper } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginToEmp4 } from '../redux/authSlice';
import '../App.css';

import SnackbarAlert from './CustomComponents/SnackbarAlert';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    terms: Yup.bool()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('Terms and conditions acceptance is required'),
});

export default function TermsAndConditions() {

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {

            navigate('/dashboard'); // Replace with your desired route

        } catch (error) {
            setOpen(true);
            setMessage("Something Went Wrong!!");
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url("/shoes.jpg")',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar alt="Remy Sharp" src="/Shoes.png" />

                        <Typography component="h1" variant="h5">
                            Terms and Conditions
                        </Typography>
                        <Formik
                            initialValues={{ terms: false }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <FormControlLabel
                                        control={<Field name="terms" as={Checkbox} />}
                                        label="I accept the Terms and Conditions"
                                    />
                                    {touched.terms && errors.terms && (
                                        <Typography color="error" variant="body2">
                                            {errors.terms}
                                        </Typography>
                                    )}

                                    <div style={{ display: 'flex', marginTop: '20px' }}>
                                        <Button sx={{
                                            backgroundColor: '#8B0000',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'darkblue',
                                            },
                                            margin: '10px'
                                        }} onClick={() => {
                                            navigate('/previous-page') // Replace with your desired route
                                        }} variant="contained" fullWidth>
                                            Back
                                        </Button>
                                        <Button sx={{
                                            backgroundColor: '#8B0000',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'darkblue',
                                            },
                                            margin: '10px 0'
                                        }} type="submit" variant="contained" fullWidth>
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </Grid>
            <SnackbarAlert open={open} onClose={() => setOpen(false)} message={message} />
        </ThemeProvider>
    );
}
