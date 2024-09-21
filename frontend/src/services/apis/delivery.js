import axios from 'axios';
import { getTokens, replaceJWTIfRefreshed } from './utils/authToken';
import { API_URL } from '@/constants/constants';

// Delivery Boy
export const loginDeliveryBoy = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/delivery/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("Delivery boy login failed:", error);
        throw error;
    }
};

export const getPackedOrders = async () => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/delivery/packed-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching packed orders failed:", error);
        throw error;
    }
};

export const acceptOrder = async (orderId) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.post(`${API_URL}/api/delivery/accept-order/${orderId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Accepting order failed:", error);
        throw error;
    }
};

export const getAcceptedOrders = async () => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/delivery/accepted-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching accepted orders failed:", error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.put(`${API_URL}/api/delivery/update-order-status/${orderId}`, { status }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Updating order status failed:", error);
        throw error;
    }
};