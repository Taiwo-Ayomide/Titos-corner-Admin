// Login.js
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/userRedux';  // Adjust the import path based on your project structure

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('All fields are necessary');
      return;
    }
  
    const user = { email, password };
  
    try {
      const response = await axios.post('https://titos-corner.onrender.com/api/users/login', user);
      console.log('Full Response Data:', response.data); // Log the entire response data
  
      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken); // Store accessToken
          alert('Welcome');
          dispatch(loginSuccess(response.data));
          navigate('/'); // Redirect to homepage
        } else {
          console.error('AccessToken not found in response data');
        }
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20, outline: 'none' }}
        type="text"
        name="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20, outline: 'none' }}
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
