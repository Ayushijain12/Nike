// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import UserInfo from './components/UserInfo';
import PersonalInfo from './components/PersonalUserInfo';
import KYCinfo from './components/KycInfo';
import TermsConditions from './components/terms&Condition';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { Provider } from 'react-redux';
import store from './redux/store';
import PageNotFound from './PageNotFound'; // Import the new component




const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  // Effect to monitor localStorage changes
  useEffect(() => {
    const bankInfo = localStorage.getItem('BankInfo');
    console.log('bankInfo',bankInfo);
    if (bankInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);



  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* If user is logged in, redirect to dashboard */}
          {isLoggedIn  ? (
            <>
              <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
              <Route path="/" element={<ProtectedRoute component={Dashboard} />} />

              {/* If the user tries to access any other path, show 404 */}
              <Route path="*" element={<PageNotFound />} />
            </>
          ) : (
            <>
              {/* If user is not logged in, allow access only to the login page */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user-info" element={<UserInfo />} />
              <Route path="/personal-user-info" element={<PersonalInfo />} />
              <Route path="/kyc-user-info" element={<KYCinfo />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              {/* Any other route should show 404 */}
              <Route path="*" element={<PageNotFound />} />
            </>
          )}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
