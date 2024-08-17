// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './components/Dashboard/MainDashbord';
import AddResturant from './components/AddResturants/MainAddForm';
import { Provider } from 'react-redux';
import store from './redux/store';



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add/restaurant"
            element={
              <ProtectedRoute>
                <AddResturant />
              </ProtectedRoute>
            }
          />
            <Route
            path="/edit/restaurant/:id"
            element={
              <ProtectedRoute>
                <AddResturant />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
