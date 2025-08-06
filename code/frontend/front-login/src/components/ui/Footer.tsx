import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="glass-container" style={{ margin: '1rem', padding: '2rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-secondary)' }}>
                <p>&copy; 2025 (et plus si dieu le veux) Mon Portfolio </p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                    Développé avec Next.js et React
                </p>
            </div>
        </footer>
    );
};

export default Footer;
