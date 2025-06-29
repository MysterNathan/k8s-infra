'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LoginData } from '@/types';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: '',
  });
  const [formError, setFormError] = useState<string>('');
  const { login, isLoading, error, user } = useAuth();
  const router = useRouter();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Effacer les erreurs lors de la saisie
    if (formError) setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation côté client
    if (!formData.username.trim()) {
      setFormError('Le nom d\'utilisateur est requis');
      return;
    }

    if (!formData.password) {
      setFormError('Le mot de passe est requis');
      return;
    }

    const success = await login(formData);
    if (success) {
      router.push('/');
    }
  };

  if (user) {
    return null; // Éviter le flash pendant la redirection
  }

  return (
      <div className="form-container glass-container">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          Connexion
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Nom d'utilisateur
            </label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Entrez votre nom d'utilisateur"
                disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Entrez votre mot de passe"
                disabled={isLoading}
            />
          </div>

          {(formError || error) && (
              <div className="error-message">
                {formError || error}
              </div>
          )}

          <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{
                width: '100%',
                marginTop: '1rem',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Pas encore de compte ?{' '}
            <Link
                href="/register"
                style={{
                  color: 'var(--text-accent)',
                  textDecoration: 'none',
                  pointerEvents: isLoading ? 'none' : 'auto'
                }}
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
  );
};

export default LoginPage;
