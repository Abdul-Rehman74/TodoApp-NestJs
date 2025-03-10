import React, { useState, useEffect } from "react";
import "./todoAddForm.scss";
import { addTodo } from "../../services/todo";

const AddTodoForm = ({ onClose, editTodo, onSubmit,fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title || "");
      setDescription(editTodo.description || "");
      setCompleted(editTodo.completed || false);
    }
  }, [editTodo]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const todoData = {
      title,
      description,
      completed,
    };

    try {
      if (editTodo) {
        await onSubmit({ ...todoData ,id:editTodo.id});
      } else {
        const response = await addTodo(todoData);
        fetchTodos();
      }
      onClose();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <div className="add-todo-form">
      <div className="form-header">
        <h2>{editTodo ? "Edit Task" : "Add New Task"}</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? "error" : ""}
            placeholder="What needs to be done?"
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details (optional)"
            rows="3"
          />
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label htmlFor="completed">Completed</label>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {editTodo ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoForm;