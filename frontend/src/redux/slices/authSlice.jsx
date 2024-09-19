/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {

    loading: false,
    error: null,
    token: null,
};

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        try {
            sessionStorage.removeItem('userToken');
        } catch (error) {
            console.log(error);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }) => {
        try {
            const response = await axios.post(apiUrl + '/login', { email, password });
            sessionStorage.setItem('userToken', response.data.token);
            return response.data;
        } catch (error) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        }
    }
)

export const createUser = createAsyncThunk(
    'auth/createUser',
    async ({ email, username, password }) => {
        try {
            const response = await axios.post(apiUrl + '/register', { email, username, password });
            return response.data;
        } catch (error) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = payload.token;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                // state.error = payload;
            })
    }
});

export default authSlice.reducer;
