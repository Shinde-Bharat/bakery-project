import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItemQuantity, clearCart, moveFromWishlist, syncCartWithDatabase } from '@/redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist, clearWishlist, moveToCart, syncWishlistWithDatabase } from '@/redux/slices/wishlistSlice';
import { login, logout, fetchUserProfile, updateProfile } from '@/redux/slices/userSlice';
import { clearOrderSummary, setOrderSummary } from '@/redux/slices/orderSummerySlice';

export const useCart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const syncCart = async () => {
        await dispatch(syncCartWithDatabase());
    };

    return {
        cart,
        addItem: (item) => {
            dispatch(addItem(item));
            syncCart();
        },
        removeItem: (id) => {
            dispatch(removeItem(id));
            syncCart();
        },
        updateItemQuantity: (id, quantity) => {

            dispatch(updateItemQuantity({ id, quantity }));
            syncCart();
        },
        clearCart: () => {
            dispatch(clearCart());
            syncCart();
        },
        moveFromWishlist: (item) => {
            dispatch(moveFromWishlist(item));
            syncCart();
        }
    };
};

export const useWishlist = () => {
    const wishlist = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    const syncWishlist = async () => {
        await dispatch(syncWishlistWithDatabase());
    };

    return {
        wishlist,
        addToWishlist: (item) => {
            dispatch(addToWishlist(item));
            syncWishlist();
        },
        removeFromWishlist: (id) => {
            dispatch(removeFromWishlist(id));
            syncWishlist();
        },
        clearWishlist: () => {
            dispatch(clearWishlist());
            syncWishlist();
        },
        moveToCart: (item) => {
            dispatch(moveToCart(item));
            syncWishlist();
        }
    };
};

export const useUser = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return {
        user,
        login: (userData) => dispatch(login(userData)),
        logout: () => dispatch(logout()),
        fetchProfile: () => dispatch(fetchUserProfile()),
        updateProfile: (profileData) => dispatch(updateProfile(profileData))
    };
};

export const useOrderSummary = () => {
    const orderSummary = useSelector(state => state.orderSummary);
    const dispatch = useDispatch();

    return {
        orderSummary,
        setOrderSummary: (summaryData) => dispatch(setOrderSummary(summaryData)),
        clearOrderSummary: () => dispatch(clearOrderSummary()),
    };
};