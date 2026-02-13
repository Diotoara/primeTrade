"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

export default function NewAssetPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    balance: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // The backend will extract the owner ID from the JWT token
      await api.post('/assets', {
        ...formData,
        balance: parseFloat(formData.balance)
      });
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create asset');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 transition-colors">
      <ThemeToggle />
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-sm text-blue-600 dark:text-cyan-400 hover:underline mb-8 inline-block">
          ← Back to Portfolio
        </Link>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Add New Asset</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Asset Name</label>
              <input
                required
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="e.g. Bitcoin"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Symbol</label>
              <input
                required
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="BTC"
                onChange={(e) => setFormData({...formData, symbol: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Initial Balance</label>
              <input
                required
                type="number"
                step="any"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="0.00"
                onChange={(e) => setFormData({...formData, balance: e.target.value})}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Minting Asset...' : 'Add to Portfolio'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}