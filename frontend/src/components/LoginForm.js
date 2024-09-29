"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      const { data } = response;
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Login successful');
      router.push('/');
    } catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="w-full h-3/4 bg-secondary p-8 rounded shadow-lg px-24 flex flex-col justify-around">
        <h2 className="text-4xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-primary font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 " htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary transition-colors disabled:bg-secondary disabled:text-gray-500"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </div>
  );
};

export default LoginForm;
