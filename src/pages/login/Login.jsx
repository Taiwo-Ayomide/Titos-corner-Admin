import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/userRedux';  // Adjust the import path based on your project structure

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // State to manage loading button text

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
      setLoading(true); // Set loading state to true when the request is made
      const response = await axios.post('https://titos-corner.onrender.com/api/users/login', user);
  
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
    } finally {
      setLoading(false); // Reset loading state after the request is completed
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
      <div style={{ position: "relative", marginBottom: 20 }}>
        <input
          style={{ padding: 10, outline: 'none', width: '100%' }}
          type={showPassword ? "text" : "password"}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button
        onClick={handleClick}
        style={{ padding: 10, width: 100 }}
        disabled={loading} // Disable button when loading
      >
        {loading ? "Loading..." : "Login"} {/* Change button text based on loading state */}
      </button>
    </div>
  );
};

export default Login;
