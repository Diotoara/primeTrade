import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white selection:bg-cyan-500/30">
      {/*  Glow */}
      <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.15),transparent_80%)]" />

      <main className="text-center px-4">
        <div className="mb-6 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
          Backend Intern Assignment
        </div>
        
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
          Web3 <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Asset Vault</span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
          A scalable REST API with Role-Based Access Control, secure JWT authentication, 
          and a high-performance dashboard built with Next.js and Node.js.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/login"
            className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 font-bold text-black transition-all hover:bg-slate-200 active:scale-95"
          >
            Launch Dashboard
          </Link>
          <Link 
            href="https://github.com/Diotoara/primeTrade" 
            target="_blank"
            className="w-full sm:w-auto rounded-xl border border-slate-800 bg-slate-900/50 px-8 py-4 font-bold transition-all hover:bg-slate-800 active:scale-95"
          >
            View Source Code
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-8 text-slate-500 text-sm">
        Built for the Backend Developer Internship Assignment • 2026
      </footer>
    </div>
  );
}