import React from 'react';
import { TextField, FormControl, FormLabel, FormHelperText } from '@mui/material';
import { ErrorMessage, useField } from 'formik';

const CustomTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl fullWidth variant="outlined" error={meta.touched && Boolean(meta.error)}>
      <FormLabel>
        {label} <span style={{ color: 'red' }}>*</span>
      </FormLabel>
      <TextField
        {...field}
        {...props}
        variant="outlined"
        error={meta.touched && Boolean(meta.error)}
      
      />
      {meta.touched && meta.error ? (
        <FormHelperText>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default CustomTextField;
