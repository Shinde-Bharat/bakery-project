import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload;
            state.items = state.items.filter(item => item.id !== idToRemove);
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
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
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    }
});

export const { addItem, removeItem, updateItemQuantity, clearCart, moveFromWishlist } = cartSlice.actions;
export default cartSlice.reducer;