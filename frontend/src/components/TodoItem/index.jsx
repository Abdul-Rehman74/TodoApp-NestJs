import React from "react";
import "./todo.scss";

const TodoItem = ({ todo, onDelete, onEdit, onStatusToggle }) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <div className="todo-header">
          <div className="todo-status" onClick={() => onStatusToggle(todo)}>
            {todo.completed ? (
              <div className="checkbox checked">✓</div>
            ) : (
              <div className="checkbox"></div>
            )}
          </div>
          <h3 className={todo.completed ? "strike-through" : ""}>{todo.title}</h3>
          <span className={`status-badge ${todo.completed ? "completed" : "pending"}`}>
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>
        
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
      </div>

      <div className="todo-actions">
        <button onClick={() => onEdit(todo ,todo.id)} className="edit-btn">
          <span className="action-icon">✎</span>
        </button>
        <button onClick={() => onDelete(todo.id)} className="delete-btn">
          <span className="action-icon">✕</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;