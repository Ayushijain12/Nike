import React from 'react';
import { useEffect } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginToEmp, VerifyNumber } from '../redux/authSlice';
import '../App.css';

import SnackbarAlert from '../components/CustomComponents/SnackbarAlert';

const defaultTheme = createTheme();
const validationSchema = Yup.object({
    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
});


export default function SignInSide() {

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [initialValues, setInitialValues] = React.useState({ mobile: '' });


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handSubmit = async (values) => {
        try {
            const result = await dispatch(loginToEmp(values));
            const response = result.payload;
            if (response.status === 200) {
                navigate('/user-info');
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
        const mobile = localStorage.getItem('mobile');
        if (mobile) {
            setInitialValues({  mobile : mobile });
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
                             Nike User
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
                                        name="mobile"
                                        as={TextField}
                                        label="Mobile Number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.mobile ? errors.mobile : ''}
                                        error={touched.mobile && Boolean(errors.mobile)}
                                    />
                                  
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