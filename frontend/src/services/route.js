import api from "../core/api";

export const getRoutes = async () => {
    try {
        const response = await api.get("/api/route?populate=*");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
