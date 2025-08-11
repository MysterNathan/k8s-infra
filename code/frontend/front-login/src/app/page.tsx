'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Section from '@/components/ui/Section';
import TechItem from "@/components/ui/TechItem";
import HeroSection from '@/components/sections/HeroSection';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const techStack = [
    {
      title: "Orchestration",
      icon: "⚙️",
      description: "Kubernetes est mon terrain de jeu principal",
      badges: [
        "Kubernetes",
        "Helm",
        "ArgoCD (GitOps)",
        "Kustomize",
        "RBAC",
        "Network Policies"
      ],
      variant: "highlight" as const
    },
    {
      title: "Observabilité",
      icon: "📊",
      badges: [
        "Prometheus",
        "Grafana",
        "AlertManager",
        "Loki (logs)",
        "Jaeger (tracing)"
      ]
    },
    {
      title: "CI/CD",
      icon: "🚀",
      badges: [
        "GitHub Actions",
        "GitLab CI",
        "Jenkins",
        "Tekton Pipelines"
      ]
    },
    {
      title: "Infrastructure",
      icon: "🏗️",
      badges: [
        "Terraform",
        "Ansible",
        "Packer",
        "Vagrant"
      ]
    },
    {
      title: "Stockage & BDD",
      icon: "💾",
      badges: [
        "PostgreSQL",
        "Zalando Postgres Operator",
        "Longhorn (volumes)",
        "Docker Registry"
      ]
    },
    {
      title: "Applications",
      icon: "💻",
      description: "Stack de développement moderne",
      badges: [
        "React / Next.js (frontend)",
        "Golang (backend)"
      ]
    }
  ];

  const monitoringServices = [
    {
      title: 'Grafana',
      emoji: '📈',
      description: 'Visualisation des métriques en temps réel',
      url: 'https://mysternathan.freeboxos.fr/grafana'
    },
    {
      title: 'Prometheus',
      emoji: '⏱️',
      description: 'Collecte et stockage des métriques système',
      url: 'https://mysternathan.freeboxos.fr/prometheus'
    }
  ];

  return (
      <div className="app-container">

        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
          {/* Section présentation */}
          <HeroSection />

          {/* Stack technique */}
          <Section>
            <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-accent)' }}>
              Stack technique
            </h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Kubernetes est mon terrain de jeu. Voici les outils que j'utilise au quotidien.
            </p>

            <div style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}>
              {techStack.map((item, index) => (
                  <TechItem
                      key={index}
                      title={item.title}
                      icon={item.icon}
                      description={item.description}
                      badges={item.badges}
                      variant={item.variant}
                  />
              ))}
            </div>
          </Section>

          {/* Section monitoring */}
          <Section>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-accent)' }}>
              Monitoring
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {monitoringServices.map((service, index) => (
                  <a
                      key={index}
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.emoji}</div>
                      <h3 style={{ marginBottom: '0.5rem' }}>{service.title}</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        {service.description}
                      </p>
                    </div>
                  </a>
              ))}
            </div>
          </Section>
        </main>

      </div>
  );
};

export default HomePage;
