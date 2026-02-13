"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { AssetTable } from '@/components/dashboard/AssetTable';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [assets, setAssets] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Guard the route
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  // Fetch your seeded data
  useEffect(() => {
    if (user) {
      setDataLoading(true);
      api.get('/assets')
        .then(res => {
            console.log("assets data : ",res)
            setAssets(res.data)
        })
        .catch(err => console.error("Error loading assets:", err))
        .finally(() => setDataLoading(false));
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">Verifying Credentials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ThemeToggle />
      
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Vault Overview</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-slate-600 dark:text-slate-400">Account: <span className="font-mono text-blue-600 dark:text-cyan-400">{user.email}</span></p>
              {user.role === 'admin' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Admin</span>
              )}
            </div>
          </div>
          <div className='flex gap-4' >
            <Link
                href="/dashboard/new" 
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-md"
                >
                + Add Asset
            </Link>
          <button 
            onClick={logout} 
            className="px-6 py-2.5 bg-white dark:bg-slate-900 text-red-600 border border-red-200 dark:border-red-900/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-semibold shadow-sm"
          >
            Logout
          </button>
          </div>
        </header>

        <div className="grid gap-6">
          {/* Main  Area */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Asset Balances</h2>
            
            {dataLoading ? (
              <div className="py-20 text-center text-slate-400 animate-pulse">Fetching latest blockchain data...</div>
            ) : assets.length > 0 ? (
              <AssetTable assets={assets} />
            ) : (
              <div className="py-20 text-center">
                <p className="text-slate-500">No assets found. Try seeding the database!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}