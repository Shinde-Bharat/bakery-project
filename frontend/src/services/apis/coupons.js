import axios from 'axios';
import { getTokens, replaceJWTIfRefreshed } from '../utils/authToken';
import { API_URL } from '@/constants/constants';

// Coupons
export const createCoupon = async (couponData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.post(`${API_URL}/api/coupons`, couponData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Coupon creation failed:", error);
        throw error;
    }
};

export const getAllCoupons = async () => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/coupons`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching coupons failed:", error);
        throw error;
    }
};

export const getCoupon = async (id) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/coupons/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching coupon failed:", error);
        throw error;
    }
};

export const updateCoupon = async (id, couponData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.put(`${API_URL}/api/coupons/${id}`, couponData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Updating coupon failed:", error);
        throw error;
    }
};

export const deleteCoupon = async (id) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.delete(`${API_URL}/api/coupons/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Deleting coupon failed:", error);
        throw error;
    }
};