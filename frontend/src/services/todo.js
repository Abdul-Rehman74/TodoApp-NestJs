import api from "../core/api";
import store from "../redux/store"


export const getTodos = async () => {
    try {
        const token = store.getState().user?.token;
        const response = await api.get("/todos" , {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
};


export const addTodo = async (todoData) => {
    try {
        console.log(todoData)
        const token = store.getState().user.token;
        const response = await api.post("/todos/create", todoData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
          
        return response;
    } catch (error) {
        console.error("Error adding todo:", error);
    }
};


export const updateTodo = async (id, updatedData) => {
    console.log(id,updatedData)
    try {
        const token = store.getState().user.token;
        const response = await api.post(`/todos/update/${id}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};


export const deleteTodo = async (id) => {
    try {
        const token = store.getState().user.token;
        await api.delete(`/todos/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
};
