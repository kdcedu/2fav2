import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [tempAuthCode, setTempAuthCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const login = (credentials) => {
    // Simulate API call
    if (credentials.email === 'hs@kdc.edu.vn' && credentials.password === 'kdcedu123') {
      if (is2FAEnabled) {
        // Generate a random 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setTempAuthCode(code);
        return { requiresTwoFactor: true, code };
      } else {
        setUser({ email: credentials.email });
        navigate('/security');
        return { requiresTwoFactor: false };
      }
    }
    throw new Error('Invalid credentials');
  };

  const verify2FACode = (code) => {
    if (code === tempAuthCode) {
      setUser({ email: 'demo@example.com' });
      setTempAuthCode(null);
      // Delay navigation to allow success message to be displayed
      setTimeout(() => {
        navigate('/security');
      }, 5000); // Match the timeout for hiding the success message
      return true;
    }
    return false;
  };

  const setup2FA = (phone) => {
    setPhoneNumber(phone);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setTempAuthCode(code);
    return code;
  };

  const confirm2FASetup = (code) => {
    if (code === tempAuthCode) {
      setIs2FAEnabled(true);
      setTempAuthCode(null);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTempAuthCode(null);
    navigate('/login');
  };

  const value = {
    user,
    is2FAEnabled,
    phoneNumber,
    login,
    logout,
    verify2FACode,
    setup2FA,
    confirm2FASetup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};