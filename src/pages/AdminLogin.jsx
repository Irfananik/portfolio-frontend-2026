import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { ShieldCheck, Lock, User, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
  });

  // Redirect to dashboard if JWT token is already stored
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    try {
      // POST request to backend auth endpoint sending { username, password }
      const { data } = await API.post('/auth/login', formData);

      // Store JWT token in localStorage
      const token = data.token || data.data?.token;
      if (token) {
        localStorage.setItem('adminToken', token);
        navigate('/admin/dashboard', { replace: true });
      } else {
        throw new Error('Authentication token missing from response.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setStatus({
        loading: false,
        error: err.response?.data?.message || err.message || 'Invalid username or password.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex flex-col justify-center items-center px-4 py-12">
      {/* Light/Dark Theme Switcher */}
      <ThemeToggle />
      {/* Back to Home Link */}
      <Link
        to="/"
        className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      {/* Login Card */}
      <div className="card w-full max-w-md bg-base-100 border border-base-200 shadow-2xl">
        <div className="card-body p-8 space-y-6">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-1">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
            <p className="text-xs text-base-content/60">
              Sign in to manage your portfolio content
            </p>
          </div>

          {/* Error Alert */}
          {status.error && (
            <div className="alert alert-error bg-error/10 border-error/20 text-error text-xs p-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{status.error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                  Username
                </span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-base-content/40" />
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="admin"
                  value={formData.username}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 bg-base-200 focus:input-primary transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                  Password
                </span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-base-content/40" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 bg-base-200 focus:input-primary transition-colors text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="btn btn-primary w-full mt-4 text-sm font-medium gap-2"
            >
              {status.loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}