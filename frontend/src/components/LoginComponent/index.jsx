import React, { useState } from "react";
import './loginComponent.scss';
import { loginUser } from "../../services/auth";

const LoginComponent = ({ onSignupClick, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginUser(formData);
      onLoginSuccess(response.data);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner-small"></div>
                <span>Logging in...</span>
              </>
            ) : 'Login'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <button className="link-btn" onClick={onSignupClick}>Sign up</button></p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;