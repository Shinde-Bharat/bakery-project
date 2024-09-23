import axios from 'axios';
import { getTokens, replaceJWTIfRefreshed } from '../utils/authToken';
import { API_URL } from '@/constants/constants';

// Categories
export const createCategory = async (categoryData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.post(`${API_URL}/api/categories`, categoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Category creation failed:", error);
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching categories failed:", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.delete(`${API_URL}/api/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Deleting category failed:", error);
        throw error;
    }
};