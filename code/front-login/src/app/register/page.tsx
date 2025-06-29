'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { RegisterData } from '@/types';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<RegisterData>({
        username: '',
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState<string>('');
    const { register, isLoading, error, user } = useAuth();
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

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');

        // Validation côté client
        if (!formData.username.trim()) {
            setFormError('Le nom d\'utilisateur est requis');
            return;
        }

        if (formData.username.length < 3) {
            setFormError('Le nom d\'utilisateur doit contenir au moins 3 caractères');
            return;
        }

        if (!formData.email.trim()) {
            setFormError('L\'email est requis');
            return;
        }

        if (!validateEmail(formData.email)) {
            setFormError('Veuillez entrer un email valide');
            return;
        }

        if (!formData.password) {
            setFormError('Le mot de passe est requis');
            return;
        }

        if (formData.password.length < 6) {
            setFormError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        const success = await register(formData);
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
                Inscription
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
                        placeholder="Minimum 3 caractères"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="votre@email.com"
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
                        placeholder="Minimum 6 caractères"
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
                    {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Déjà un compte ?{' '}
                    <Link
                        href="/login"
                        style={{
                            color: 'var(--text-accent)',
                            textDecoration: 'none',
                            pointerEvents: isLoading ? 'none' : 'auto'
                        }}
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
