import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: '',
        username: '',
        accessToken: '',
        storageId: '',
        role: '',
        isLoggin: false
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.accessToken = action.payload.accessToken;
            state.storageId = action.payload.storageId;
            state.isLoggin = true;
            state.role = action.payload.role
        },
        logout: (state) => {
            state.userId = '';
            state.username = '';
            state.accessToken = '';
            state.storageId = '';
            state.isLoggin = false;
            state.role = ''
        }
    }
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer