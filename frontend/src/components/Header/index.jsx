import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './header.scss';
import { logoutUser } from '../../redux/user/user';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userName = useSelector((state) => state.user?.user?.user?.username) || "Abdul Rehman Test";
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.token);
  
  const getInitials = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`;
    }
    return name[0];
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate("/auth"); 
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-icon">✓</span>
            <h1 className="logo-text">To Do App</h1>
          </div>
        </div>

        {token && (

        <div className="header-right">
          <div className="user-welcome">
            <span>Welcome back,</span>
            <strong>{userName}</strong>
          </div>
          
          
          <div className="user-profile" onClick={toggleMenu}>
            <div className="user-avatar">
              {getInitials(userName)}
            </div>
            <span className="dropdown-arrow">▼</span>
            
            {menuOpen && (
              <div className="user-menu">
                <ul>
                  <li>
                    <span className="menu-icon">👤</span>
                    Profile
                  </li>
                  <li>
                    <span className="menu-icon">⚙️</span>
                    Settings
                  </li>
                  <li className="divider"></li>
                  <li className="logout" onClick={handleLogout}>
                    <span className="menu-icon">🚪</span>
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
          )}
      </div>
    </header>
  );
};

export default Header;