import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import axios from 'axios';

import './App.css'; 

const App = () => {
  const [token, setToken] = useState('');

  // Dummy login function to simulate token fetching
  const handleLogin = async () => {
    try {

      const response = await axios.post('http://localhost:3000/api/login', {
        username: 'AHMETZ',
        password: 'ahmet123'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Extract token from response
      console.log(response.data)
      const  access  = response.data.token;
      setToken(access); 
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>User Management</h1>
        {!token && <button onClick={handleLogin}>Login</button>}
      </header>
      {token ? (
        <div className="app-container">
          <div className="content">
            <UserForm token={token} className="user-form" />
            <UserList token={token} className="user-list" />
          </div>
        </div>
      ) : (
        <div className="login-prompt">
          <p>Please log in to access  the application.</p>
        </div>
      )}
    </div>
  );
};

export default App;
