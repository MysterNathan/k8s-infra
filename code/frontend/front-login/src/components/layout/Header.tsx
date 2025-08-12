"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    // Vérification du statut de connexion
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    // Fermer le menu mobile lors du redimensionnement
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setIsMobileMenuOpen(false);
        router.push('/');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link href="/" className={styles.titleLink} onClick={closeMobileMenu}>
                    <h1 className={styles.title}>Nathan DevOps</h1>
                </Link>

                {/* Version Desktop */}
                <div className={styles.headerRight}>
                    <nav className={styles.nav}>
                        <a href="#about" className={styles.navLink}>À propos</a>
                        <Link href="/stack" className={styles.navLink}>Stack</Link>
                        <a href="#monitoring" className={styles.navLink}>Monitoring</a>
                        <a href="#projects" className={styles.navLink}>Projets</a>
                    </nav>

                    <div className={styles.actions}>
                        {/* Bouton Thème */}
                        <button
                            className={styles.themeToggle}
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? "Passer au thème clair" : "Passer au thème sombre"}
                        >
                            <span className={styles.themeIcon}>
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </span>
                        </button>

                        {/* Boutons d'authentification */}
                        <div className={styles.authButtons}>
                            {isLoggedIn ? (
                                <div className={styles.userMenu}>
                                    <span className={styles.userIcon}>👤</span>
                                    <button
                                        className={`${styles.authButton} ${styles.logoutButton}`}
                                        onClick={handleLogout}
                                    >
                                        <span className={styles.buttonIcon}>🚪</span>
                                        Déconnexion
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className={`${styles.authButton} ${styles.loginButton}`}
                                    >
                                        <span className={styles.buttonIcon}>🔑</span>
                                        Connexion
                                    </Link>
                                    <Link
                                        href="/register"
                                        className={`${styles.authButton} ${styles.registerButton}`}
                                    >
                                        <span className={styles.buttonIcon}>✨</span>
                                        Inscription
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Version Mobile */}
                <div className={styles.mobileControls}>
                    <button
                        className={styles.themeToggleMobile}
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? "Passer au thème clair" : "Passer au thème sombre"}
                    >
                        <span className={styles.themeIcon}>
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </span>
                    </button>

                    <button
                        className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.mobileMenuContent}>
                    <nav className={styles.mobileNav}>
                        <a href="#about" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                            <span className={styles.mobileNavIcon}>👨‍💻</span>
                            À propos
                        </a>
                        <Link href="/stack" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                            <span className={styles.mobileNavIcon}>⚡</span>
                            Stack
                        </Link>
                        <a href="#monitoring" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                            <span className={styles.mobileNavIcon}>📊</span>
                            Monitoring
                        </a>
                        <a href="#projects" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                            <span className={styles.mobileNavIcon}>🚀</span>
                            Projets
                        </a>
                    </nav>

                    <div className={styles.mobileAuth}>
                        {isLoggedIn ? (
                            <div className={styles.mobileUserMenu}>
                                <div className={styles.mobileUserInfo}>
                                    <span className={styles.mobileUserIcon}>👤</span>
                                    <span>Connecté</span>
                                </div>
                                <button
                                    className={`${styles.mobileAuthButton} ${styles.mobileLogoutButton}`}
                                    onClick={handleLogout}
                                >
                                    <span className={styles.mobileAuthIcon}>🚪</span>
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <div className={styles.mobileAuthButtons}>
                                <Link
                                    href="/login"
                                    className={`${styles.mobileAuthButton} ${styles.mobileLoginButton}`}
                                    onClick={closeMobileMenu}
                                >
                                    <span className={styles.mobileAuthIcon}>🔑</span>
                                    Connexion
                                </Link>
                                <Link
                                    href="/register"
                                    className={`${styles.mobileAuthButton} ${styles.mobileRegisterButton}`}
                                    onClick={closeMobileMenu}
                                >
                                    <span className={styles.mobileAuthIcon}>✨</span>
                                    Inscription
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className={styles.mobileMenuOverlay}
                    onClick={closeMobileMenu}
                />
            )}
        </header>
    );
};

export default Header;
