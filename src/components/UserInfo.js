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
import { loginToEmp2, VerifyNumber } from '../redux/authSlice';
import '../App.css';

import SnackbarAlert from './CustomComponents/SnackbarAlert';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    fname: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name can be at most 50 characters')
        .required('First name is required'),
    lname: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name can be at most 50 characters')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    address: Yup.string()
        .min(5, 'Address must be at least 5 characters')
        .required('Address is required'),
});


export default function SignInSide() {

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [initialValues, setInitialValues] = React.useState(
        {
            fname: '',
            lname: '',
            email: '',
            address: '',
        }
    );


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handSubmit = async (values) => {
        try {
            const result = await dispatch(loginToEmp2(values));
            const response = result.payload;
            if (response.status === 200) {
                navigate('/personal-user-info');
            } else {
                setOpen(true);
                setMessage(response.error);
            }
        } catch (error) {
            setOpen(true);
            setMessage("Something Went Wrong!!")
        }
    }

    useEffect(() => {
        const Userinfo = localStorage.getItem('Userinfo');
        console.log(JSON.parse(Userinfo))
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
                            User Info
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handSubmit}
                            enableReinitialize={true}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        name="fname"
                                        as={TextField}
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.fname ? errors.fname : ''}
                                        error={touched.fname && Boolean(errors.fname)}
                                    />

                                    <Field
                                        name="lname"
                                        as={TextField}
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.lname ? errors.lname : ''}
                                        error={touched.lname && Boolean(errors.lname)}
                                    />


                                    <Field
                                        name="email"
                                        as={TextField}
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.email ? errors.email : ''}
                                        error={touched.email && Boolean(errors.email)}
                                    />

                                    <Field
                                        name="address"
                                        as={TextField}
                                        label="Address"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.address ? errors.address : ''}
                                        error={touched.address && Boolean(errors.address)}
                                    />

                                    <div style={{ display: 'flex' }}>
                                        <Button sx={{
                                            backgroundColor: '#8B0000',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'darkblue',
                                            },
                                            margin: '10px'
                                        }} onClick={() => {
                                            navigate('/login')
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