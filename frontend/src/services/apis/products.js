import axios from 'axios';
import { getTokens, replaceJWTIfRefreshed } from './utils/authToken';
import { API_URL } from '@/constants/constants';
// Products
export const createProduct = async (productData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.post(`${API_URL}/api/products`, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Product creation failed:", error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/products`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching products failed:", error);
        throw error;
    }
};

export const getProduct = async (id) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching product failed:", error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.put(`${API_URL}/api/products/${id}`, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Updating product failed:", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.delete(`${API_URL}/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Deleting product failed:", error);
        throw error;
    }
};