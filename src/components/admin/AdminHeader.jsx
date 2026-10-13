import { ShieldCheck, LogOut, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle'; // Adjust path if needed

export default function AdminHeader({ onLogout }) {
  return (
    <header className="bg-base-100 border-b border-base-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-xl">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-xs text-base-content/60">Portfolio Control Panel</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Light/Dark Theme Switcher */}
        <ThemeToggle />

        {/* Return to Public Portfolio */}
        <Link
          to="/"
          className="btn btn-ghost btn-sm gap-2 text-base-content/80 hover:text-primary"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Portfolio</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="btn btn-ghost btn-sm text-error hover:bg-error/10 gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}