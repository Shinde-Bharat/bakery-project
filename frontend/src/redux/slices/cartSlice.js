import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserProfile } from '@/services/apis/user';

export const syncCartWithDatabase = createAsyncThunk(
    'cart/syncWithDatabase',
    async (_, { getState }) => {
        const { cart } = getState();
        await updateUserProfile({ cartItems: cart.items });
        return cart.items;
    }
);
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload;
            state.items = state.items.filter(item => item._id !== idToRemove);
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item._id === id);
            if (item) {
                item.quantity = quantity;
            }
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
        moveFromWishlist: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    }, extraReducers: (builder) => {
        builder.addCase(syncCartWithDatabase.fulfilled, (state, action) => {
            // Update state if necessary after syncing with database
        });
    }
});

export const { addItem, removeItem, updateItemQuantity, clearCart, moveFromWishlist } = cartSlice.actions;
export default cartSlice.reducer;