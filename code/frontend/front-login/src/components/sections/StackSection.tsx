"use client";

import React from 'react';
import styles from './StackSection.module.css';

export interface StackSection {
    title: string;
    description: string;
    tags?: string[];
    icon?: string;
    gradient?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
    stats?: {
        experience?: string;
        projects?: number;
        level?: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
    };
    features?: string[];
    useCases?: string[];
    certifications?: string[];
    reversed?: boolean;
    children?: React.ReactNode; // Pour du contenu personnalisé
}

const StackSection: React.FC<StackSection> = ({
                                                       title,
                                                       description,
                                                       tags = [],
                                                       icon,
                                                       gradient = 'primary',
                                                       features = [],
                                                       useCases = [],
                                                       certifications = [],
                                                       reversed = false,
                                                       children
                                                   }) => {

    return (
        <section className={`${styles.stackSection} ${styles[gradient]} ${reversed ? styles.reversed : ''}`}>
            <div className={styles.background}>
                <div className={styles.gridPattern}></div>
                <div className={styles.floatingElements}>
                    <span className={styles.floatingElement}>⚡</span>
                    <span className={styles.floatingElement}>🚀</span>
                    <span className={styles.floatingElement}>💫</span>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    {/* En-tête */}
                    <div className={styles.header}>
                        {icon && (
                            <div className={styles.iconContainer}>
                                <span className={styles.icon}>{icon}</span>
                            </div>
                        )}
                        <div className={styles.titleSection}>
                            <h2 className={styles.title}>{title}</h2>
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.description}>
                        <p>{description}</p>
                    </div>

                    {/* Features et Use Cases */}
                    {(features.length > 0 || useCases.length > 0) && (
                        <div className={styles.detailsGrid}>
                            {features.length > 0 && (
                                <div className={styles.detailCard}>
                                    <h4 className={styles.detailTitle}>
                                        <span className={styles.detailIcon}>⭐</span>
                                        Points forts
                                    </h4>
                                    <ul className={styles.detailList}>
                                        {features.map((feature, index) => (
                                            <li key={index} className={styles.detailItem}>
                                                <span className={styles.bullet}>▶</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {useCases.length > 0 && (
                                <div className={styles.detailCard}>
                                    <h4 className={styles.detailTitle}>
                                        <span className={styles.detailIcon}>🎯</span>
                                        Cas d'usage
                                    </h4>
                                    <ul className={styles.detailList}>
                                        {useCases.map((useCase, index) => (
                                            <li key={index} className={styles.detailItem}>
                                                <span className={styles.bullet}>▶</span>
                                                {useCase}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <div className={styles.certifications}>
                            <h4 className={styles.certificationsTitle}>
                                <span className={styles.certificationIcon}>🏆</span>
                                Certifications
                            </h4>
                            <div className={styles.certificationsList}>
                                {certifications.map((cert, index) => (
                                    <div key={index} className={styles.certification}>
                                        <span className={styles.certificationBadge}>✓</span>
                                        {cert}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className={styles.tags}>
                            {tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>
                  #{tag}
                </span>
                            ))}
                        </div>
                    )}

                    {/* Contenu personnalisé */}
                    {children && (
                        <div className={styles.customContent}>
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StackSection;
