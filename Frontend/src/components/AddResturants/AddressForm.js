import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { RegisterRestaurant, GetRestaurantsbyID } from '../../redux/restaurantSlice';
import SnackbarAlert from '../CustomComponents/SnackbarAlert';
import { useParams } from 'react-router-dom';

// Validation Schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  address1: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  phone: Yup.string()
    .required('Required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Must be a valid phone number'),
  email: Yup.string()
    .required('Required')
    .email('Must be a valid email address'),
  zip: Yup.string()
    .required('Required')
    .matches(/^\d{5}(-\d{4})?$/, 'Must be a valid postal code (e.g., 12345 or 12345-6789)'),
});

const AddressForm = ({ handlenavigate }) => {
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    address1: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    website: '',
  });
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(GetRestaurantsbyID(id));
        const response = result.payload;

        if (response) {
          setInitialValues({
            name: response.name || '',
            description: response.description || '',
            address1: response.street_address || '',
            city: response.city || '',
            state: response.state || '',
            zip: response.postal_code || '',
            phone: response.phone || '',
            email: response.email || '',
            website: response.website || '',
            id: response.id
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await dispatch(RegisterRestaurant(values));
      const response = result.payload;

      if (response.status === 200) {
        alert(response.message);
        handlenavigate();
        resetForm();
      } else {
        setOpen(true);
        setMessage(response.error);
      }
    } catch (error) {
      setOpen(true);
      setMessage("Something Went Wrong!!");
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Field name="name">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label={<><span style={{ color: 'red' }}>*</span> Restaurant Name</>}
                      placeholder="John"
                      fullWidth
                      variant="outlined"
                      error={touched.name && !!errors.name}
                      helperText={<ErrorMessage name="name" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field name="description">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label={<><span style={{ color: 'red' }}>*</span> Description</>}
                      placeholder="Snow"
                      fullWidth
                      variant="outlined"
                      error={touched.description && !!errors.description}
                      helperText={<ErrorMessage name="description" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field name="phone">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label={<><span style={{ color: 'red' }}>*</span> Phone</>}
                      placeholder="3493894893894"
                      fullWidth
                      variant="outlined"
                      error={touched.phone && !!errors.phone}
                      helperText={<ErrorMessage name="phone" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label={<><span style={{ color: 'red' }}>*</span> Email</>}
                      type="email"
                      placeholder="xya@gmail.com"
                      fullWidth
                      variant="outlined"
                      error={touched.email && !!errors.email}
                      helperText={<ErrorMessage name="email" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="address1">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label={<><span style={{ color: 'red' }}>*</span> Street Address</>}
                      placeholder="Street name and number"
                      fullWidth
                      variant="outlined"
                      error={touched.address1 && !!errors.address1}
                      helperText={<ErrorMessage name="address1" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field name="city">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label={<><span style={{ color: 'red' }}>*</span> City</>}
                      placeholder="New York"
                      fullWidth
                      variant="outlined"
                      error={touched.city && !!errors.city}
                      helperText={<ErrorMessage name="city" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field name="state">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label={<><span style={{ color: 'red' }}>*</span> State</>}
                      placeholder="NY"
                      fullWidth
                      variant="outlined"
                      error={touched.state && !!errors.state}
                      helperText={<ErrorMessage name="state" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field name="zip">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label={<><span style={{ color: 'red' }}>*</span> Zip / Postal Code</>}
                      placeholder="12345"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={touched.zip && !!errors.zip}
                      helperText={<ErrorMessage name="zip" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field name="website">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Website Link"
                      placeholder="https://example.com"
                      fullWidth
                      type="text"
                      variant="outlined"
                      error={touched.website && !!errors.website}
                      helperText={<ErrorMessage name="website" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <SnackbarAlert open={open} onClose={() => setOpen(false)} message={message} />
    </>
  );
};

export default AddressForm;
