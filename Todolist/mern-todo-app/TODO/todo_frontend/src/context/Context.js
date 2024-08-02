import { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { username, password });
      setAuth(data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post('/api/auth/register', { username, password });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
