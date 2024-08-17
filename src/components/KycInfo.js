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
import { loginToEmp4 } from '../redux/authSlice';
import '../App.css';

import SnackbarAlert from './CustomComponents/SnackbarAlert';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    bankAccountNumber: Yup.string()
        .matches(/^\d{9,18}$/, 'Bank account number must be between 9 and 18 digits')
        .required('Bank account number is required'),
    bankName: Yup.string()
        .min(2, 'Bank name must be at least 2 characters')
        .max(100, 'Bank name can be at most 100 characters')
        .required('Bank name is required'),
    ifscCode: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format')
        .required('IFSC code is required'),
});

export default function SignInSide() {

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [initialValues, setInitialValues] = React.useState(
        {
            bankAccountNumber: '',
            bankName: '',
            ifscCode: '',
        }
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const result = await dispatch(loginToEmp4(values));
            const response = result.payload;
            if (response.status === 200) {
                navigate('/terms-conditions');
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
        const Userinfo = localStorage.getItem('BankInfo');
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
                            Bank Account Info
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        name="bankAccountNumber"
                                        as={TextField}
                                        label="Bank Account Number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.bankAccountNumber ? errors.bankAccountNumber : ''}
                                        error={touched.bankAccountNumber && Boolean(errors.bankAccountNumber)}
                                    />

                                    <Field
                                        name="bankName"
                                        as={TextField}
                                        label="Bank Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.bankName ? errors.bankName : ''}
                                        error={touched.bankName && Boolean(errors.bankName)}
                                    />

                                    <Field
                                        name="ifscCode"
                                        as={TextField}
                                        label="IFSC Code"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.ifscCode ? errors.ifscCode : ''}
                                        error={touched.ifscCode && Boolean(errors.ifscCode)}
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
                                            navigate('/personal-user-info')
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
