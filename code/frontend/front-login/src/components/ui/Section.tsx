// components/ui/Section.tsx
import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    padding?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'center';
}

const Section: React.FC<SectionProps> = ({
                                             children,
                                             className = '',
                                             style = {},
                                             padding = 'md',
                                             variant = 'default'
                                         }) => {
    const paddingMap = {
        sm: '1.25rem',
        md: '2rem',
        lg: '3rem 2rem'
    };

    const baseStyle: React.CSSProperties = {
        padding: paddingMap[padding],
        marginBottom: '2rem',
        ...(variant === 'center' && { textAlign: 'center' }),
        ...style
    };

    return (
        <section className={`glass-container ${className}`} style={baseStyle}>
            {children}
        </section>
    );
};

export default Section;
