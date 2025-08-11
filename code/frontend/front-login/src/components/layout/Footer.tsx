import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerGrid}>
                    <div className={styles.footerSection}>
                        <h3>Contact</h3>
                        <p>nathan.fernandes1004@gmail.com</p>
                    </div>
                    <div className={styles.footerSection}>
                        <h3>Technologies</h3>
                        <p>Kubernetes • React • Go</p>
                    </div>
                    <div className={styles.footerSection}>
                        <h3>Liens</h3>
                        <div className={styles.footerLinks}>
                            <a
                                href="https://github.com/MysterNathan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.footerLink}
                            >
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/nathan-f-117479164/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.footerLink}
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>&copy; 2025 Nathan Portfolio - Spécialiste DevOps</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
