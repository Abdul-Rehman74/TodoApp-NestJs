import api from "../core/api";


export const registerUser = async (userData) => {
    try {
        console.log(userData)
        const response = await api.post("/api/auth/local/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
    }
};


export const loginUser = async (credentials) => {
    try {
        const updatedCredentials = { 
            identifier: credentials.email, 
            password: credentials.password 
        };
        const response = await api.post("/api/auth/local", updatedCredentials);
        return response;
    } catch (error) {
        console.error("Error logging in:", error);
    }
};
