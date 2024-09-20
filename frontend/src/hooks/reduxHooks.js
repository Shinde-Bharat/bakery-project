import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItemQuantity, clearCart, moveFromWishlist } from '@/redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist, clearWishlist, moveToCart } from '@/redux/slices/wishlistSlice';
import { login, logout, updateUserInfo } from '@/redux/slices/userSlice';

export const useCart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return {
        cart,
        addItem: (item) => dispatch(addItem(item)),
        removeItem: (id) => dispatch(removeItem(id)),
        updateItemQuantity: (id, quantity) => dispatch(updateItemQuantity({ id, quantity })),
        clearCart: () => dispatch(clearCart()),
        moveFromWishlist: (item) => dispatch(moveFromWishlist(item))
    };
};

export const useWishlist = () => {
    const wishlist = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    return {
        wishlist,
        addToWishlist: (item) => dispatch(addToWishlist(item)),
        removeFromWishlist: (id) => dispatch(removeFromWishlist(id)),
        clearWishlist: () => dispatch(clearWishlist()),
        moveToCart: (item) => dispatch(moveToCart(item))
    };
};

export const useUser = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return {
        user,
        login: (userData) => dispatch(login(userData)),
        logout: () => dispatch(logout()),
        updateUserInfo: (userData) => dispatch(updateUserInfo(userData))
    };
};