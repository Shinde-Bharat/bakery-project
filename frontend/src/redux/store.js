import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice,
        user: userSlice
    }
});

export default store;