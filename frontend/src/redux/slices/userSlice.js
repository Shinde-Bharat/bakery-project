import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        name: null,
        email: null,
        isLoggedIn: false
    },
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.isLoggedIn = false;
        },
        updateUserInfo: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { login, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;