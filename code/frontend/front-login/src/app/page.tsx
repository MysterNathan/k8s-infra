'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
/* eslint-disable react/no-unescaped-entities */

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
              Je suis Nathan, 27 ans, jeune DevOps célibataire et libre comme l'air.
              Mon quotidien: concevoir, déployer et opérer des plateformes fiables.
              Kubernetes est mon terrain de jeu: architecture de clusters, automatisation, GitOps, CI/CD, observabilité et sécurité.
              Côté applicatif, j’utilise React et Go avec sobriété et je continue d’apprendre.
              Ce portfolio met surtout en avant mes projets et bonnes pratiques autour de k8s.\n
              Bonne visite !
            </p>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Spécialiste de ne pas faire les choses jusqu'au bout - (Bientôt) Diplômé Bac+5
          </p>
        </section>

        {/* Stack technique */}
        <section
            className="glass-container"
            style={{ padding: '2rem', marginBottom: '2rem' }}
        >
          <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-accent)' }}>
            Stack technique
          </h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            Kubernetes est mon terrain de jeu. Voici les outils que j’utilise au quotidien. Bonne visite.
          </p>

          <div
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              }}
          >
            {/* Monitoring */}
            <div className="glass-container" style={{ padding: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Monitoring</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <li className="badge">Grafana</li>
                <li className="badge">Prometheus</li>
              </ul>
            </div>

            {/* Sécurité */}
            <div className="glass-container" style={{ padding: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Sécurité</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <li className="badge">Falco</li>
              </ul>
            </div>

            {/* Réseau / Ingress */}
            <div className="glass-container" style={{ padding: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Réseau</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <li className="badge">MetalLB (IP provider)</li>
                <li className="badge">Traefik (Gateway)</li>
              </ul>
            </div>

            {/* Packaging / Gestion */}
            <div className="glass-container" style={{ padding: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Gestion</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <li className="badge">Helm (manager)</li>
              </ul>
            </div>

            {/* Données */}
            <div className="glass-container" style={{ padding: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Données</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <li className="badge">Zalando Postgres Operator</li>
                <li className="badge">Longhorn (volumes)</li>
                <li className="badge">Docker Registry</li>
              </ul>
            </div>

            {/* Applications */}
            <div className="glass-container" style={{ padding: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Applications</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <li className="badge">React / Next.js (frontend)</li>
                <li className="badge">Golang (backend)</li>
              </ul>
            </div>
          </div>
        </section>


        {/* Section des services */}
        <section className="glass-container" style={{ padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-accent)' }}>
            Monitoring
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {/* Bloc Grafana */}
            <a
                href="https://mysternathan.freeboxos.fr/grafana"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
                <h3 style={{ marginBottom: '0.5rem' }}>Grafana</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Visualisation des métriques en temps réel
                </p>
              </div>
            </a>

            {/* Bloc Prometheus */}
            <a
                href="https://mysternathan.freeboxos.fr/prometheus"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏱️</div>
                <h3 style={{ marginBottom: '0.5rem' }}>Prometheus</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Collecte et stockage des métriques système
                </p>
              </div>
            </a>
          </div>
        </section>


      </div>
  );
};

export default HomePage;
