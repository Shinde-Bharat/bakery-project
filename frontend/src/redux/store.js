import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import userSlice from "./slices/userSlice";
import orderSummarySlice from "./slices/orderSummerySlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'wishlist', 'user'], // Only persist these slices
};

const rootReducer = combineReducers({
    cart: cartSlice,
    wishlist: wishlistSlice,
    user: userSlice,
    orderSummary: orderSummarySlice, //this is not persist
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST']
            }
        })
});

export const persistor = persistStore(store);