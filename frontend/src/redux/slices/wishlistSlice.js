import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            if (!state.some(item => item.id === action.payload.id)) {
                state.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        clearWishlist: (state) => {
            return [];
        },
        moveToCart: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        }
    }
});

export const { addToWishlist, removeFromWishlist, clearWishlist, moveToCart } = wishlistSlice.actions;
export default wishlistSlice.reducer;