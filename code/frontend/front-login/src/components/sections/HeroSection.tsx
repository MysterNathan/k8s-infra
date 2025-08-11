import React from 'react';
import Section from '@/components/ui/Section';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
    return (
        <Section padding="lg" variant="center" className={styles.heroSection}>
            <h1 className={styles.title}>
                Bienvenue sur mon Portfolio
            </h1>

            <div className={styles.introCard}>
                <div className={styles.introContent}>
                    <p className={styles.introText}>
                        Je suis Nathan, 27 ans, Devops de son état, célibataire et libre comme l'air.
                        <br className={styles.desktopBreak} />
                        Ce que j'aime: concevoir, déployer et opérer des plateformes fiables.
                    </p>

                    <p className={styles.introText}>
                        En ce moment Kubernetes est mon terrain de jeu: architecture de clusters,
                        automatisation, GitOps, CI/CD, observabilité et sécurité.
                    </p>

                    <p className={styles.introText}>
                        Côté applicatif, j'utilise React et Go avec sobriété et je continue d'apprendre.
                        Ce portfolio met surtout en avant mes projets et bonnes pratiques autour de k8s.
                    </p>

                    <p className={styles.welcomeText}>
                        Bonne visite ! 👋
                    </p>
                </div>
            </div>

            <p className={styles.subtitle}>
                Spécialiste de ne pas faire les choses jusqu'au bout - (Bientôt) Diplômé Bac+5
            </p>
        </Section>
    );
};

export default HeroSection;
