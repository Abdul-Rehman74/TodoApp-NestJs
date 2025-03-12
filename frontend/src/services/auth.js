import api from "../core/api";


export const registerUser = async (userData) => {
    try {
        console.log(userData)
        const response = await api.post("/users/create", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
    }
};


export const loginUser = async (credentials) => {
    try {
        const updatedCredentials = { 
            email: credentials.email, 
            password: credentials.password 
        };
        console.log('Data been sent',updatedCredentials)
        const response = await api.post("/auth/login", updatedCredentials);
        console.log('Response : ',response)
        return response;
    } catch (error) {
        console.error("Error logging in:", error);
    }
};
