import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const bankInfo = localStorage.getItem('BankInfo');

    if (bankInfo) {
        return <Component />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
