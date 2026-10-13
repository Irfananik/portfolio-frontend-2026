import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle'; // Import the new component

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (id) => {
    if (!isHomePage) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Projects', href: 'projects' },
    { name: 'Skills', href: 'skills' },
    { name: 'Experience', href: 'experience' },
    { name: 'Education', href: 'education' },
    { name: 'Contact', href: 'contact' },
  ];

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-300 px-4 sm:px-8">
      {/* Navbar Start: Brand Logo / Name */}
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
          Portfolio<span className="text-accent">.</span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Navigation Links */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ) : (
                <Link to={`/#${link.href}`}>{link.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End: Theme Toggle, Admin Portal, & Mobile Menu */}
      <div className="navbar-end gap-2">
        {/* Independent Theme Toggle Component */}
        <ThemeToggle />

        {/* Portal Button for Admin Access */}
        <Link
          to="/admin/login"
          className="btn btn-ghost btn-xs sm:btn-sm gap-1.5 text-xs text-base-content/70 hover:text-primary"
          title="Admin Control Panel"
        >
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span className="hidden sm:inline">Admin</span>
        </Link>

        {/* Mobile Hamburger Menu Dropdown */}
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Menu className="w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-200 rounded-box w-52 border border-base-300"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                {isHomePage ? (
                  <button
                    onClick={() => {
                      scrollToSection(link.href);
                      document.activeElement?.blur();
                    }}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link to={`/#${link.href}`}>{link.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}