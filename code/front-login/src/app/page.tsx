'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Section de présentation */}
        <section className="glass-container" style={{ padding: '3rem 2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Bienvenue sur mon Portfolio
          </h1>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border-color)', borderRadius: '8px', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              [Espace pour votre présentation - Champ de texte à ajouter plus tard]
            </p>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Spécialiste Système et Réseau - Diplômé Bac+5
          </p>
        </section>

        {/* Contenu conditionnel basé sur l'authentification */}
        {user ? (
            <section className="glass-container" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-accent)' }}>
                Espace Membre
              </h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="glass-container" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>📊 Statistiques</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Accès aux données détaillées de votre profil et projets
                  </p>
                </div>
                <div className="glass-container" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>🔧 Projets Privés</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Consultez vos projets et configurations système
                  </p>
                </div>
                <div className="glass-container" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>📝 Documentation</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Accès complet à la documentation technique
                  </p>
                </div>
              </div>
            </section>
        ) : (
            <section className="glass-container" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-accent)' }}>
                Découvrez mon parcours
              </h2>
              <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Connectez-vous pour accéder à du contenu exclusif, mes projets détaillés et ma documentation technique.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div className="glass-container" style={{ padding: '1.5rem', flex: '1', minWidth: '300px' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>🎓 Formation</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Master en Systèmes et Réseaux - Expertise technique approfondie
                  </p>
                </div>
                <div className="glass-container" style={{ padding: '1.5rem', flex: '1', minWidth: '300px' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>💼 Compétences</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Administration système, Réseaux, Sécurité, Développement
                  </p>
                </div>
              </div>
            </section>
        )}

        {/* Section des services */}
        <section className="glass-container" style={{ padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-accent)' }}>
            Mes domaines d'expertise
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖥️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Administration Système</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Linux, Windows Server, Virtualisation
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Réseaux</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Configuration, Sécurité, Monitoring
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Cybersécurité</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Audit, Prévention, Réponse aux incidents
              </p>
            </div>
          </div>
        </section>
      </div>
  );
};

export default HomePage;
