import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {

    id: null,
    email: null,
    username: null,
    loading: false,
    error: null,
    friends: null,
    messages: null,
    currentRoom: null,

};

export const saveMessage = createAsyncThunk(
    'usersaveMessage/',
    async (message) => {

        const token = sessionStorage.getItem('userToken');
        try {

            const response = await axios.post(apiUrl + '/save-message', { message }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response)

        } catch (error) {
            console.log(error);
        }
    }
)
export const getMessageList = createAsyncThunk(
    'user/getMessageList',
    async ({ roomName }, { rejectWithValue }) => {
        const token = sessionStorage.getItem('userToken');
        console.log(roomName)
        try {
            const response = await axios.get(apiUrl + '/get-message-list', {
                params: { roomName },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data || 'Something went wrong');
        }
    }
);

export const joinRoom = createAsyncThunk(
    'user/joinRoom',
    async ({ socket, roomName }, { rejectWithValue }) => {
        const token = sessionStorage.getItem('userToken');
        try {
            const response = await axios.post(
                `${apiUrl}/join-room`,
                { socketId: socket.id, roomName },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || 'Bir hata oluştu');
        }
    }
);


export const getUser = createAsyncThunk(
    'user/getUser',
    async () => {
        try {
            const token = sessionStorage.getItem('userToken');

            const response = await axios.get(apiUrl + '/get-user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
)

export const getUserFriends = createAsyncThunk(
    'user/getUserFriends',
    async () => {
        try {
            const token = sessionStorage.getItem('userToken');

            const response = await axios.get(apiUrl + '/get-user-friends', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {

                state.id = payload._id;
                state.email = payload.email;
                state.username = payload.username;

            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.loading = false;
                // state.error = null;
            })
            .addCase(getUserFriends.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserFriends.fulfilled, (state, { payload }) => {

                state.friends = payload;
            })
            .addCase(getUserFriends.rejected, (state, { payload }) => {
                state.loading = false;
                // state.error = null;
            })
            .addCase(joinRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(joinRoom.fulfilled, (state, { payload }) => {
                console.log(payload)
                // state.friends = payload;
            })
            .addCase(joinRoom.rejected, (state, { payload }) => {
                state.loading = false;
                // state.error = null;
            })
            .addCase(saveMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveMessage.fulfilled, (state, { payload }) => {

                state.loading = false;
            })
            .addCase(saveMessage.rejected, (state, { payload }) => {
                state.loading = false;
                // state.error = null;
            })
            .addCase(getMessageList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMessageList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.messages = payload;
            })
            .addCase(getMessageList.rejected, (state, { payload }) => {
                state.loading = false;
                // state.error = null;
            })
    }

});

export default userSlice.reducer;
