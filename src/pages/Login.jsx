import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
      return;
    }
    
    axios
      .post('http://localhost:5002/user/login', { email, password }) // Adjust the endpoint as needed
      .then((response) => {
        const { email, token, userId } = response.data;
        console.log(response.data)

        localStorage.setItem('token', token);
        localStorage.setItem('user', email);
        localStorage.setItem('userId', userId);

        enqueueSnackbar('Login successful', { variant: 'success' });
        navigate('/home', { state: { email } });
      })
      .catch((error) => {
        enqueueSnackbar('Login failed', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="container-fluid bg-light max-vh-100 d-flex align-items-center justify-content-center">
    <div className="w-100 min-vh-100">
    {/* Header */}
     <div className="d-flex justify-content-between align-items-center bg-white p-4 mb-5 ">
      <h1 className="fw-bold fs-2 mb-0">My WORKOUT GYM</h1>
      <div>
        <Link to="/" className="text-decoration-none me-3 ">Login</Link>
        <Link to="/Signup" className="text-decoration-none ">Signup</Link>
      </div>
     </div>
    {/* Signup Form */}
   <div className="bg-white rounded shadow p-4 my-5 mx-auto" style={{ maxWidth: "400px" }}>
    <h2 className="mb-4 fw-bold">Login</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address:
        </label>
        <input 
        type="email" 
        className="form-control" 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input 
        type="password" 
        className="form-control"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password" />
      </div>
      <button onClick={handleLogin} type="submit" className="btn btn-primary w-25">
        Login
      </button>
    </form>
  </div>
</div>
</div>
  )
}

export default Login
