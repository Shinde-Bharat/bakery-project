import axios from 'axios';
import { getTokens, replaceJWTIfRefreshed } from '../utils/authToken';
import { API_URL } from '../../constants/constants';

// Admin User Management
export const changeUserRole = async (userData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.put(`${API_URL}/api/users/change-role`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Changing user role failed:", error);
        throw error;
    }
};

export const addUser = async (userData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.post(`${API_URL}/api/users/add-user`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Adding user failed:", error);
        throw error;
    }
};

export const listUsers = async () => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/users/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Listing users failed:", error);
        throw error;
    }
};

export const createDeliveryBoy = async (deliveryBoyData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.post(`${API_URL}/api/users/create-delivery-boy`, deliveryBoyData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Creating delivery boy failed:", error);
        throw error;
    }
};
