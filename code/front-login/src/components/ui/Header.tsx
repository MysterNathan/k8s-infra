'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '../ThemeProvider';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
      <header className="glass-container" style={{ margin: '1rem', padding: '1rem 2rem' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-accent)', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Mon Portfolio
          </Link>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
                onClick={toggleTheme}
                className="btn-secondary"
                style={{ padding: '0.5rem' }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {user ? (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-primary)' }}>
                Bienvenue, {user.username}
              </span>
                  <button onClick={logout} className="btn-secondary">
                    Déconnexion
                  </button>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link href="/login" className="btn-primary">
                    Connexion
                  </Link>
                  <Link href="/register" className="btn-secondary">
                    Inscription
                  </Link>
                </div>
            )}
          </div>
        </nav>
      </header>
  );
};

export default Header;
