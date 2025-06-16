'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {isAuthenticated ? `Bienvenue ${user?.name}` : 'Bienvenue sur mon application'}
          </h1>
          
          <div className="presentation-section">
            {isAuthenticated ? (
              <div className="authenticated-content">
                <h2>Tableau de bord</h2>
                <div className="dashboard-cards">
                  <div className="card">
                    <h3>Mes projets</h3>
                    <p>Gérez vos projets en cours</p>
                  </div>
                  <div className="card">
                    <h3>Statistiques</h3>
                    <p>Consultez vos performances</p>
                  </div>
                  <div className="card">
                    <h3>Profil</h3>
                    <p>Modifiez vos informations</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="presentation-content">
                <h2>Présentation</h2>
                <div className="text-content">
                  <p>
                    [Ici tu pourras ajouter ton texte de présentation]
                  </p>
                  <p>
                    Cette plateforme vous offre une expérience unique et moderne.
                    Connectez-vous pour découvrir toutes les fonctionnalités disponibles.
                  </p>
                  <div className="features-grid">
                    <div className="feature-card">
                      <h3>🚀 Performance</h3>
                      <p>Application rapide et optimisée</p>
                    </div>
                    <div className="feature-card">
                      <h3>🎨 Design</h3>
                      <p>Interface moderne et intuitive</p>
                    </div>
                    <div className="feature-card">
                      <h3>🔒 Sécurité</h3>
                      <p>Vos données sont protégées</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
