"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };


    const handleSignup = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post(`${apiUrl}/auth/signup`, {
                email,
                username,
                password
            });
            const { data } = response;
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            toast.success('Signup successful');
            router.push('/');
        } catch (error) {
            toast.error('Signup failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-3/4 bg-white shadow-lg rounded-lg p-8 px-24 flex flex-col justify-around">
            <h2 className="text-4xl text-primary  font-bold text-center mb-6">Signup</h2>
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
            <div className="mb-4">
                <label className="block text-primary font-medium mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-primary  font-medium mb-2" htmlFor="password">
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
            <div className="mb-6">
                <label className="block text-primary  font-medium mb-2" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Confirm your password"
                    required
                />
            </div>
            <button
                onClick={handleSignup}
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary transition-colors disabled:bg-secondary disabled:text-gray-500"
            >
                {isSubmitting ? 'Signing up...' : 'Signup'}
            </button>
        </div>
    );
};

export default SignupForm;
