import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile, updateUserProfile } from '@/services/apis/user';

export const fetchUserProfile = createAsyncThunk(
    'user/fetchProfile',
    async () => {

        const response = await getUserProfile();
        return response.data;
    }
);
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (profileData) => {

        const response = await updateUserProfile(profileData);
        return response.data;
    }
);
const userSlice = createSlice({
    name: 'user',
    initialState: {

        name: null,
        email: null,
        phoneNumber: null,
        isLoggedIn: false,
        savedAddresses: [],
        orderHistory: [],
        wishlistItems: [],
        cartItems: []
    },
    reducers: {
        login: (state, action) => {
            console.log("action payload", action.payload);

            return { ...state, ...action.payload, isLoggedIn: true };
        },
        logout: (state) => {
            return { ...state, name: null, email: null, phoneNumber: null, isLoggedIn: false, savedAddresses: [], orderHistory: [], wishlistItems: [], cartItems: [] };
        },
        updateUserInfo: (state, action) => {
            return { ...state, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                return { ...state, ...action.payload, isLoggedIn: true };
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            });
    }
});

export const { login, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;