// src/app/auth/login/login.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!username || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin
      ? 'http://127.0.0.1:8000/auth/login/'
      : 'http://127.0.0.1:8000/users/create/'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      const data  = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      console.log(isLogin ? 'Logged in' : 'Signed up')

      window.location.href = '/dashboard'

    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <div className="card">
        <h1 className="title">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
        
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div>
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="submitButton"
            style={{
              opacity: loading ? 0.7 : 1,
              pointerEvents: loading ? 'none' : 'auto'
            }}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="toggleText">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="toggleButton"
          >
            {isLogin ? 'Sign up here' : 'Login here'}
          </button>
        </p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          background-color: #f3f4f6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .card {
          width: 100%;
          max-width: 28rem;
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .title {
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 2rem;
          color: #1f2937;
        }

        .error {
          margin-bottom: 1rem;
          padding: 0.75rem;
          background-color: #fee2e2;
          color: #dc2626;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .form {
          display: grid;
          gap: 1.5rem;
        }

        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .input {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          outline: none;
          font-size: 1rem;
          background-color: white;  // Added white background
          color: black;            // Added black text color
        }

        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }

        .submitButton {
          width: 100%;
          background-color: #2563eb;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
        }

        .submitButton:hover {
          background-color: #1d4ed8;
        }

        .toggleText {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .toggleButton {
          color: #2563eb;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-size: 0.875rem;
        }

        .toggleButton:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}