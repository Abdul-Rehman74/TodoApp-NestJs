import React, { useState } from "react";
import './auth.scss'
import { useDispatch, useSelector } from "react-redux";
import LoginComponent from "../../components/LoginComponent";
import SignUpComponent from "../../components/SignUpComponent";
import { setUser } from "../../redux/user/user";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [currentView, setCurrentView] = useState('login');
  const dispatch = useDispatch(); 
  const navigate = useNavigate();


  const handleLoginSuccess = (userData) => {
    dispatch(setUser(userData)); 
    navigate("/home")
  };
  
  const handleSignupSuccess = (userData) => {
    console.log("Signup successful:", userData);
    setCurrentView('login');
    
  };
  
  return (
    <div className="auth-wrapper">
      {currentView === 'login' ? (
        <LoginComponent
          onSignupClick={() => setCurrentView('signup')}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <SignUpComponent
          onLoginClick={() => setCurrentView('login')}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </div>
  );
};

export default Auth;