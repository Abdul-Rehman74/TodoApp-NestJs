import React, { useEffect, useState } from "react";
import TodoItem from "../TodoItem";
import './homeComponent.scss';
import { getTodos, deleteTodo, updateTodo } from "../../services/todo";
import AddTodoForm from "../TodoAddFrom";

const HomeComponent = () => {
  const [todos, setTodos] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  const handleTodoUpdate = async (updatedTodo) => {
    try {
      const { id, ...dataToSend } = updatedTodo;
      const response = await updateTodo(updatedTodo.id, dataToSend);
      setTodos(todos.map(todo => todo.id === updatedTodo.id ? response.data : todo));
      setIsFormOpen(false);
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleStatusToggle = async (todo) => {
    const updatedTodo = { completed: !todo.completed };
    try {
      const response = await updateTodo(todo.id, updatedTodo);
      setTodos(todos.map(t => t.id === todo.id ? response.data : t));
    } catch (error) {
      console.error("Error toggling todo status:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>My Tasks</h1>
        <button className="add-btn" onClick={handleAddNew}>
          <span>+</span> New Task
        </button>
      </div>

      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      ) : (
        <>
          {todos.length > 0 ? (
            <div className="todo-list">
              {todos.map((todo) => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onDelete={handleDelete} 
                  onEdit={handleEdit}
                  onStatusToggle={handleStatusToggle}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p>No tasks found. Add a new task to get started!</p>
              <button className="add-btn" onClick={handleAddNew}>
                <span>+</span> Add Your First Task
              </button>
            </div>
          )}
        </>
      )}

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <AddTodoForm
              onClose={handleFormClose} 
              editTodo={editingTodo} 
              onSubmit={handleTodoUpdate}
              fetchTodos={fetchTodos}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
