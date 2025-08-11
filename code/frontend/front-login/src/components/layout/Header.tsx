import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.title}>Nathan DevOps Portfolio</h1>
                <nav className={styles.nav}>
                    <a href="#about" className={styles.navLink}>À propos</a>
                    <a href="#stack" className={styles.navLink}>Stack</a>
                    <a href="#monitoring" className={styles.navLink}>Monitoring</a>
                    <a href="#projects" className={styles.navLink}>Projets</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
