'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import StackSection from '@/components/sections/StackSection';

const StacksPage: React.FC = () => {
    useAuth();

    return (
        <div className="app-container">
            {/* Section Orchestration Kubernetes */}
            <StackSection
                title="Orchestration Kubernetes"
                description="Kubernetes est le 'chef d'orchestre' de ce cluster. Il s'agit d'un système qui automatise le déploiement, la mise à l'échelle et la gestion d'applications conteneurisées. Concrètement, il décide où et comment faire tourner vos applications, les redémarre si elles plantent, distribue le trafic, et s'assure que tout fonctionne comme prévu. Mon cluster fonctionne sur un serveur Dell PowerEdge T440 hébergé à domicile."
                icon="⚙️"
                gradient="primary"
                features={[
                    "Traefik (Ingress Controller) : C'est le 'portier' du cluster. Il reçoit toutes les requêtes internet et décide vers quelle application les rediriger. Il gère aussi automatiquement les certificats HTTPS pour sécuriser les connexions.",
                    "Helm : Imaginez un 'gestionnaire de paquets' pour Kubernetes. Au lieu d'installer manuellement chaque composant, Helm utilise des 'charts' (recettes) pour déployer automatiquement des applications complètes avec toute leur configuration.",
                    "MetalLB (Load Balancer) : Sur un cloud public, on aurait un load balancer automatique. Chez moi, MetalLB simule cette fonction en attribuant une adresse IP fixe au cluster, permettant l'accès depuis l'extérieur.",
                    "Zalando Postgres Operator : PostgreSQL est ma base de données. L'opérateur Zalando automatise sa gestion : création de sauvegardes, réplication, mises à jour... Il transforme PostgreSQL en service 'as a Service' dans mon cluster.",
                    "Longhorn (Stockage Persistant) : Les conteneurs sont éphémères par nature. Longhorn crée un système de stockage distribué pour que les données persistent même si un conteneur redémarre. Il réplique les données sur plusieurs nœuds pour éviter la perte."
                ]}
                useCases={[
                    "Hébergement on-premise : Contrairement aux solutions cloud, je maîtrise physiquement mon infrastructure",
                    "Auto-réparation : Si une application plante, Kubernetes la redémarre automatiquement",
                    "Scalabilité : Possibilité d'ajouter facilement des nœuds pour plus de puissance",
                    "Gestion centralisée : Un seul point de contrôle pour toute l'infrastructure"
                ]}
                tags={["Kubernetes", "Helm", "Traefik", "MetalLB", "PostgreSQL Operator", "Longhorn"]}
            />

            {/* Section Sécurité et Surveillance */}
            <StackSection
                title="Sécurité & Surveillance"
                description="Un cluster sans surveillance, c'est comme conduire les yeux fermés. Cette stack me permet de 'voir' ce qui se passe dans mon infrastructure : qui utilise quoi, quand ça ralentit, et surtout si quelque chose d'anormal se produit. C'est l'équivalent d'un centre de contrôle pour mon datacenter domestique."
                icon="🛡️"
                gradient="secondary"
                reversed
                features={[
                    "Falco (Détection d'Intrusions) : C'est mon 'garde du corps' numérique. Falco surveille en permanence le comportement du système et déclenche des alertes si quelque chose d'inhabituel se produit : processus suspect, accès non autorisé, modification de fichiers sensibles...",
                    "Prometheus (Collecte de Métriques) : Le 'compteur' du cluster. Il collecte des milliers de métriques : utilisation CPU, mémoire, réseau, nombre de requêtes... C'est la base de données temporelle qui stocke toutes ces informations pour analyse.",
                    "Grafana (Visualisation) : Si Prometheus collecte les données, Grafana les rend compréhensibles. Il transforme les métriques en graphiques, tableaux de bord, et alertes visuelles. C'est mon 'cockpit' pour surveiller l'état du cluster.",
                    "Supervision de l'infrastructure : Au-delà de Kubernetes, la stack surveille aussi Proxmox (l'hyperviseur qui héberge le cluster) et le serveur physique lui-même."
                ]}
                useCases={[
                    "Alertes proactives : Je suis prévenu avant que les problèmes deviennent critiques",
                    "Analyse forensique : En cas d'incident, je peux retracer ce qui s'est passé",
                    "Optimisation : Identifier les goulots d'étranglement et optimiser les performances",
                    "Visibilité complète : De l'application jusqu'au hardware, tout est surveillé"
                ]}
                tags={["Falco", "Grafana", "Prometheus", "AlertManager"]}
            />

            {/* Section Stockage d'Images */}
            <StackSection
                title="Registry Docker Privé"
                description="Quand vous développez des applications, vous créez des 'images Docker' (des paquets contenant votre code et tout ce dont il a besoin pour fonctionner). Normalement, on les stocke sur Docker Hub, mais j'ai créé mon propre 'entrepôt' privé. C'est comme avoir sa propre bibliothèque d'applications au lieu d'aller toujours emprunter à la bibliothèque publique."
                icon="📦"
                gradient="warning"
                features={[
                    "Registry Docker Privé : Mon 'magasin' personnel d'images Docker. Au lieu de dépendre de Docker Hub, je stocke mes images localement. Plus rapide, plus sûr, et pas de limite de téléchargement.",
                    "Gestion des Versions : Chaque modification de code génère une nouvelle version d'image. Le registry les stocke toutes, permettant de revenir en arrière si nécessaire ('rollback').",
                    "Déploiement Rapide : Les images étant sur le réseau local, les déploiements sont ultra-rapides. Pas d'attente de téléchargement depuis internet.",
                    "Sécurité : Mes images restent privées, pas d'exposition publique de code propriétaire."
                ]}
                useCases={[
                    "Images Personnalisées : Stockage de mes applications React/Next.js et Golang",
                    "Performance : Déploiements instantanés grâce au stockage local",
                    "Confidentialité : Code et configurations restent dans mon infrastructure",
                    "Préparation CI/CD : Base solide pour une future chaîne d'intégration continue"
                ]}
                tags={["Docker Registry", "Images Privées", "Versioning"]}
            />

            {/* Section Infrastructure as Code */}
            <StackSection
                title="Infrastructure as Code (IaC)"
                description="L'Infrastructure as Code, c'est traiter son infrastructure comme du code. Au lieu de configurer manuellement chaque serveur (et risquer d'oublier des étapes), j'écris des 'recettes' Ansible qui automatisent tout. C'est comme avoir un robot qui sait exactement comment construire et configurer mon datacenter, de manière identique à chaque fois."
                icon="🏗️"
                gradient="success"
                reversed
                features={[
                    "Playbooks Ansible : Des 'scripts de construction' qui décrivent étape par étape comment installer et configurer le cluster. Si je dois tout recommencer, il suffit de lancer le playbook.",
                    "Configuration Automatisée : Chaque service (Traefik, MetalLB, Longhorn...) est déployé et configuré automatiquement selon des templates prédéfinis. Zéro intervention manuelle.",
                    "Approche Déclarative : Au lieu de dire 'comment faire', je décris 'ce que je veux'. Ansible se charge de comprendre les étapes nécessaires pour atteindre l'état désiré.",
                    "Reproductibilité : Même résultat à chaque exécution, que ce soit sur mon serveur ou sur un nouvel environnement."
                ]}
                useCases={[
                    "Disaster Recovery : Reconstruction complète du cluster en quelques minutes",
                    "Environnements de Test : Création d'une copie identique pour tester sans risque",
                    "Scalabilité : Ajout automatisé de nouveaux nœuds au cluster",
                    "Documentation Vivante : Le code Ansible documente l'architecture réelle"
                ]}
                tags={["Ansible", "Infrastructure as Code", "Automation", "Playbooks"]}
            />

            {/* Section Développement d'Applications */}
            <StackSection
                title="Stack de Développement"
                description="Cette section présente les technologies utilisées pour créer les applications qui tournent dans le cluster. C'est la partie 'création' avant la partie 'déploiement'. Je développe en local, puis je conteneurise et déploie dans Kubernetes."
                icon="💻"
                gradient="primary"
                features={[
                    "React + Next.js (Frontend) : React est la bibliothèque pour créer l'interface utilisateur (ce que vous voyez). Next.js ajoute le rendu côté serveur, l'optimisation automatique et plein d'outils pour améliorer les performances et le SEO.",
                    "Golang (Backend) : Langage compilé ultra-rapide pour créer les APIs. Il gère la logique métier, l'accès aux données, et expose des endpoints REST pour le frontend. Parfait pour les microservices.",
                    "TypeScript : JavaScript 'typé' qui évite de nombreuses erreurs de développement. Le code est plus robuste et plus facile à maintenir, surtout sur des projets complexes.",
                    "Conteneurisation Docker : Chaque application est empaquetée avec toutes ses dépendances dans un conteneur. Garantit que l'app fonctionne de manière identique en développement et en production."
                ]}
                useCases={[
                    "Applications Web Modernes : PWA, SSR, optimisation SEO automatique",
                    "APIs RESTful : Communication efficace entre frontend et backend",
                    "Architecture Microservices : Services indépendants et scalables",
                    "Déploiement Continu : De l'IDE au cluster en quelques étapes"
                ]}
                tags={["React", "Next.js", "Golang", "TypeScript", "REST API", "Docker"]}
            />
        </div>
    );
};

export default StacksPage;
