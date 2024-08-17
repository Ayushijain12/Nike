// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for login
export const loginToEmp = createAsyncThunk(
  'auth/loginToEmp',
  async (values, { rejectWithValue }) => {
    try {
      localStorage.setItem('mobile', values.mobile);
      return {status : 200};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const VerifyNumber = createAsyncThunk(
  'auth/VerifyNumber',
  async (values, { rejectWithValue }) => {
    try {
      // const response = await axios.get('http://localhost:8081/VerifyNumber', values);
      // console.log()
      // return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Define the slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logindata: [],
    addResData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginToEmp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginToEmp.fulfilled, (state, action) => {
        state.loading = false;
        state.logindata = action.payload;
      })
      .addCase(loginToEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default authSlice.reducer;
