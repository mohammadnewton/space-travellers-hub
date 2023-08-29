import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    const req = axios.get('https://api.spacexdata.com/v3/missions');
    const { data } = await req;
    return data;
  },
);

const initialState = {
  missions: [],
  pending: false,
  error: false,
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.fulfilled, (state, { payload }) => ({
      ...state,
      missions: {
        missions: payload,
        pending: false,
        error: false,
      },
    }));
    builder.addCase(fetchMissions.pending, (state) => ({
      ...state,
      missions: {
        ...state.missions,
        pending: true,
        error: false,
      },
    }));

    builder.addCase(fetchMissions.rejected, (state) => ({
      ...state,
      missions: {
        ...state.missions,
        pending: false,
        error: true,
      },
    }));
  },
});

export default missionsSlice.reducer;