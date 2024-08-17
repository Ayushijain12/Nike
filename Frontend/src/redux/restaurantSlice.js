import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for login
export const RegisterRestaurant = createAsyncThunk(
  'restaurant/RegisterRestaurant',
  async (values, { rejectWithValue }) => {
    try {
      let response;
      if(values.id){
        response = await axios.put(`http://localhost:8081/edit-restaurants/${Number(values.id)}`, values);
      }else{
         response = await axios.post('http://localhost:8081/restaurants', values);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const GetRestaurants = createAsyncThunk(
  'restaurant/GetRestaurants',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8081/restaurants/lists', values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const GetRestaurantsbyID = createAsyncThunk(
  'restaurant/GetRestaurantsbyID',
  async (values, { rejectWithValue }) => {
    const restaurantId = Number(values); // Convert to a number if necessary
    try {
      const response = await axios.get(`http://localhost:8081/restaurants-id/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const DeleteRestaurantsbyID = createAsyncThunk(
  'restaurant/DeleteRestaurantsbyID',
  async (values, {dispatch, rejectWithValue }) => {
    const restaurantId = Number(values); // Convert to a number if necessary
    try {
      const response = await axios.delete(`http://localhost:8081/delete-restaurants/${restaurantId}`);
      dispatch(GetRestaurants());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Define the slice
const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    addResData: [],
    getRestaurants : [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(RegisterRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.addResData = action.payload;
      })
      .addCase(RegisterRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.getRestaurants = action.payload;
      })
      .addCase(GetRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetRestaurantsbyID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetRestaurantsbyID.fulfilled, (state, action) => {
        state.loading = false;
        state.getRestaurants = action.payload;
      })
      .addCase(GetRestaurantsbyID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DeleteRestaurantsbyID.fulfilled, (state, action) => {
        state.getRestaurants = state.getRestaurants.filter(restaurant => restaurant.id !== action.payload);
      });
      
  },
});

export default restaurantSlice.reducer;
