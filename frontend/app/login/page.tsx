"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token, data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors">
      <ThemeToggle />
      
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Access your Web3 Vault</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Email" type="email" required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Password" type="password" required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          <button 
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          New here? <Link href="/register" className="text-blue-600 dark:text-cyan-400 hover:underline font-semibold">Register</Link>
        </p>
      </div>

      {/* CREDENTIAL CRD */}

      <div className="mt-8 w-full max-w-md p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10 transition-all">
        <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400 flex items-center gap-2">
          <span>🔑</span> Demo Admin Credentials
        </h3>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono text-amber-700 dark:text-amber-500/80">
          <div className="bg-white/50 dark:bg-black/20 p-2 rounded">Email: admin@web3.com</div>
          <div className="bg-white/50 dark:bg-black/20 p-2 rounded">Pass: admin123</div>
        </div>
        <p className="mt-2 text-[10px] text-amber-600/70 dark:text-amber-500/50 italic">
          * Use this to test Admin-only features like deleting any user's asset.
        </p>
      </div>
    </div>
  );
}