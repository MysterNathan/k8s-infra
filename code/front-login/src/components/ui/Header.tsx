'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          MonApp
        </Link>

        <nav className="nav">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="welcome-text">
                Bienvenue, {user?.name}
              </span>
              <button onClick={logout} className="btn btn-secondary">
                Déconnexion
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
