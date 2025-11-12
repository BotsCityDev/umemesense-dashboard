// components/auth/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Login Failed. Check your email and password.');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000B3C]">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl border border-[#1523DB]">
        <h2 className="text-3xl font-bold text-center text-white">
          <span className="bg-gradient-to-r from-[#F8D200] to-[#3C9AE9] text-transparent bg-clip-text">
            UmemeSense
          </span>{' '}
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#1523DB] bg-[#000B3C] rounded-lg text-white focus:ring-[#3C9AE9] focus:border-[#3C9AE9]"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#1523DB] bg-[#000B3C] rounded-lg text-white focus:ring-[#3C9AE9] focus:border-[#3C9AE9]"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-[#000B3C] bg-gradient-to-r from-[#F8D200] to-[#8ACE47] rounded-lg hover:from-[#3C9AE9] hover:to-[#1523DB] hover:text-white transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <button onClick={() => router.push('/register')} className="font-medium text-[#3C9AE9] hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}