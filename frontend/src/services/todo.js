import api from "../core/api";


export const getTodos = async () => {
    try {
        const response = await api.get("/todos");
        return response;
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
};


export const addTodo = async (todoData) => {
    try {
        console.log(todoData)
        const response = await api.post("/todos/create", todoData, {
            headers: {
              "Content-Type": "application/json",
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
        const response = await api.post(`/todos/update/${id}`, updatedData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          
        return response;
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};


export const deleteTodo = async (id) => {
    try {
        await api.delete(`/todos/delete/${id}`);
        console.log(`Todo ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
};
