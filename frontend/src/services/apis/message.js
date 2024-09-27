import axios from 'axios';
import { getTokens, replaceJWTIfRefreshed } from '../utils/authToken';
import { API_URL } from '@/constants/constants';

// Create a new message message
export const createMessage = async (messageData) => {
    try {
        const response = await axios.post(`${API_URL}/api/message`, messageData);
        return response.data;
    } catch (error) {
        console.error("Message creation failed:", error);
        throw error;
    }
};

// Get all message messages 
export const getAllMessages = async () => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.get(`${API_URL}/api/message`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Fetching messages failed:", error);
        throw error;
    }
};

// Update message status 
export const updateMessageStatus = async (id, statusUpdateData) => {
    try {
        const { token, refreshToken } = getTokens();
        const response = await axios.put(`${API_URL}/api/message/${id}`, statusUpdateData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-refresh-token": refreshToken,
            },
        });
        replaceJWTIfRefreshed(response);
        return response.data;
    } catch (error) {
        console.error("Updating message status failed:", error);
        throw error;
    }
};
