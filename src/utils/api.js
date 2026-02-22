// TODO: Update this URL once backend is deployed to Heroku
const API_URL = 'http://localhost:8000/api';

export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const apiCall = async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
            throw new Error(error.detail || `HTTP error! status: ${response.status}`);
        }

        // Handle 204 No Content responses
        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

export default apiCall;
