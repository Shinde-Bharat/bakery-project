import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserProfile } from '@/services/apis/user';

export const syncWishlistWithDatabase = createAsyncThunk(
    'wishlist/syncWithDatabase',
    async (_, { getState }) => {
        const { wishlist } = getState();
        await updateUserProfile({ wishlistItems: wishlist });
        return wishlist;
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            if (!state.some(item => item._id === action.payload._id)) {
                state.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            return state.filter(item => item._id !== action.payload);
        },
        clearWishlist: (state) => {
            return [];
        },
        moveToCart: (state, action) => {
            return state.filter(item => item._id !== action.payload._id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(syncWishlistWithDatabase.fulfilled, (state, action) => {
            // Update state if necessary after syncing with database
        });
    }
});

export const { addToWishlist, removeFromWishlist, clearWishlist, moveToCart } = wishlistSlice.actions;
export default wishlistSlice.reducer;