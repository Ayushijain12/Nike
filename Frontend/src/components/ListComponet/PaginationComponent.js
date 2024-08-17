// PaginationComponent.js
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as MuiPagination } from '@mui/material';

const PaginationComponent = ({ count, page, onPageChange }) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={onPageChange} // Ensure this is properly handled
      color="primary"
    />
  );
};

PaginationComponent.propTypes = {
  count: PropTypes.number.isRequired,   // Total number of pages
  page: PropTypes.number.isRequired,    // Current page number
  onPageChange: PropTypes.func.isRequired // Callback for page change
};

export default PaginationComponent;
