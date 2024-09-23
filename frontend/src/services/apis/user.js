import axios from 'axios';
import { API_URL } from '@/constants/constants';
import { getTokens, replaceJWTIfRefreshed } from '../utils/authToken';

// User Management
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/register`, userData);
        return response.data;
    } catch (error) {
        console.error("User registration failed:", error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("User login failed:", error);
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching user profile failed:", error);
        throw error;
    }
};

export const updateUserProfile = async (profileData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.put(`${API_URL}/api/users/profile`, profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        console.log(profileData, "updated");

        return response.data;
    } catch (error) {

        console.error("Updating user profile failed:", error, token);
        throw error;
    }
};

export const addAddress = async (addressData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.post(`${API_URL}/api/users/address`, addressData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Adding address failed:", error);
        throw error;
    }
};

export const deleteAddress = async (addressId) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.delete(`${API_URL}/api/users/address/${addressId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Deleting address failed:", error);
        throw error;
    }
};

export const getUserOrders = async () => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/users/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching user orders failed:", error);
        throw error;
    }
};