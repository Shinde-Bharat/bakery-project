// src/redux/slices/orderSummarySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
};

const orderSummarySlice = createSlice({
    name: 'orderSummary',
    initialState,
    reducers: {
        setOrderSummary: (state, action) => {
            return action.payload;
        },
        clearOrderSummary: () => initialState,
    },
});

export const { setOrderSummary, clearOrderSummary } = orderSummarySlice.actions;
export default orderSummarySlice.reducer;