import React from 'react';
import styles from './TechItem.module.css';

interface TechItemProps {
    title: string;
    description?: string;
    badges: string[];
    icon?: string; // Emoji ou icône
    variant?: 'default' | 'highlight';
}

const TechItem: React.FC<TechItemProps> = ({
                                               title,
                                               description,
                                               badges,
                                               icon,
                                               variant = 'default'
                                           }) => {
    return (
        <div className={`${styles.techItem} ${styles[variant]}`}>
            <div className={styles.header}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <h3 className={styles.title}>{title}</h3>
            </div>

            {description && (
                <p className={styles.description}>{description}</p>
            )}

            <ul className={styles.badgeList}>
                {badges.map((badge, index) => (
                    <li key={index} className={styles.badge}>
                        {badge}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TechItem;
