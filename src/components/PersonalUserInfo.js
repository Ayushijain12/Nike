import React from 'react';
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginToEmp3 } from '../redux/authSlice';
import '../App.css';

import SnackbarAlert from './CustomComponents/SnackbarAlert';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    aadharNumber: Yup.string()
        .matches(/^\d{12}$/, 'Aadhar number must be exactly 12 digits')
        .required('Aadhar number is required'),
    aadharDoc: Yup.mixed()
        .required('Aadhar document is required'),
    panNumber: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'PAN number must be in the format ABCD1234E')
        .required('PAN number is required'),
    panDoc: Yup.mixed()
        .required('PAN document is required'),
});

export default function SignInSide() {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [initialValues, setInitialValues] = React.useState({
        aadharNumber: '',
        aadharDoc: null,
        panNumber: '',
        panDoc: null,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handSubmit = async (values) => {
        try {
            const result = await dispatch(loginToEmp3(values));
            const response = result.payload;
            if (response.status === 200) {
                navigate('/kyc-user-info');
            } else {
                setOpen(true);
                setMessage(response.error);
            }
        } catch (error) {
            setOpen(true);
            setMessage("Something Went Wrong!!");
        }
    }

    useEffect(() => {
        const Userinfo = localStorage.getItem('PersonalUserinfo');
        if (Userinfo) {
            setInitialValues(JSON.parse(Userinfo));
        }
    }, []);

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
                        backgroundImage: 'url("/shoes.jpg")',
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
                            User Info
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handSubmit}
                            enableReinitialize={true}
                        >
                            {({ errors, touched, setFieldValue }) => (
                                <Form>
                                    <Field
                                        name="aadharNumber"
                                        as={TextField}
                                        label="Aadhar Number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.aadharNumber ? errors.aadharNumber : ''}
                                        error={touched.aadharNumber && Boolean(errors.aadharNumber)}
                                    />

                                    <input
                                        id="aadharDoc"
                                        name="aadharDoc"
                                        type="file"
                                        onChange={(event) => setFieldValue("aadharDoc", event.currentTarget.files[0])}
                                    />
                                    {touched.aadharDoc && errors.aadharDoc ? (
                                        <div>{errors.aadharDoc}</div>
                                    ) : null}

                                    <Field
                                        name="panNumber"
                                        as={TextField}
                                        label="PAN Number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.panNumber ? errors.panNumber : ''}
                                        error={touched.panNumber && Boolean(errors.panNumber)}
                                    />

                                    <input
                                        id="panDoc"
                                        name="panDoc"
                                        type="file"
                                        onChange={(event) => setFieldValue("panDoc", event.currentTarget.files[0])}
                                    />
                                    {touched.panDoc && errors.panDoc ? (
                                        <div>{errors.panDoc}</div>
                                    ) : null}

                                    <div style={{ display: 'flex' }}>
                                        <Button
                                            sx={{
                                                backgroundColor: '#8B0000',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'darkblue',
                                                },
                                                margin: '10px'
                                            }}
                                            onClick={() => navigate('/user-info')}
                                            variant="contained"
                                            fullWidth
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            sx={{
                                                backgroundColor: '#8B0000',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'darkblue',
                                                },
                                                margin: '10px 0'
                                            }}
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                        >
                                            Next
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
