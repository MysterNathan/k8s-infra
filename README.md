
# k8s-homelab-infra

Déploiement automatisé d'un cluster Kubernetes on-premise via Ansible, hébergeant l'application [CartoStage](https://github.com/MysterNathan/cartostage) ainsi qu'une stack d'observabilité et de sécurité complète.

> Ce projet a pour objectif de simuler un environnement de production réaliste sur infrastructure bare-metal, en mettant en œuvre les bonnes pratiques DevOps/Kubernetes sans recourir à un cloud provider.

---

## Infrastructure

Le cluster est hébergé sur un serveur physique unique virtualisé via **Proxmox**, simulant un environnement multi-nœuds :

| Rôle   | Hostname       | vCores | RAM   | Disque |
|--------|----------------|--------|-------|--------|
| Master | `vitrine-0`    | 4      | 8 GB  | 100 GB |
| Worker | `kubernetes-1` | 4      | 20 GB | 100 GB |
| Worker | `kubernetes-2` | 4      | 20 GB | 100 GB |

- **OS** : Debian (bare-metal sur VMs Proxmox)
- **CNI** : Flannel
- **Outil de provisioning** : Ansible

---

## Stack technique

### Orchestration
- **[kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/)** — Choisi volontairement pour son approche manuelle et généraliste, permettant une compréhension approfondie des composants Kubernetes (etcd, kube-apiserver, kubelet...) contrairement à des distributions embarquées comme k3s.

### Ingress
- **[Traefik](https://traefik.io/)** — Ingress controller nativement compatible Kubernetes, écrit en Go, permettant l'utilisation des `IngressRoute` (CRDs). Très répandu dans l'écosystème cloud-native et développé par une entreprise française (Containous).

### Réseau & Load Balancing
- **[MetalLB](https://metallb.universe.tf/)** — Permet d'exposer des services de type `LoadBalancer` sans cloud provider. Opère sur les couches OSI 2 et 3, léger et facile à opérer. Ouvre la voie à du load balancing multi-nœuds à terme.

### Stockage distribué
- **[Longhorn](https://longhorn.io/)** — Solution de stockage distribué et redondant (HA). En cas de perte d'un nœud ou de défaillance d'un volume, les données restent accessibles grâce à la réplication entre les workers.

### Base de données
- **[Zalando Postgres Operator](https://github.com/zalando/postgres-operator)** — Gestion de PostgreSQL en HA sur Kubernetes. La haute disponibilité d'une base de données étant complexe à implémenter manuellement (failover, réplication...), Zalando offre une solution robuste, éprouvée et nativement intégrée à Kubernetes.

### Observabilité
- **Prometheus** — Collecte des métriques cluster et applicatives
- **Grafana** — Visualisation et dashboards
- **Node Exporter** — Exposition des métriques système des nœuds

### Sécurité
- **[Falco](https://falco.org/)** — Détection d'intrusion runtime, surveille les appels système et alerte sur les comportements anormaux au sein des pods
- **[Cert-manager](https://cert-manager.io/)** — Gestion automatisée des certificats TLS

### CI/CD
- **GitHub Actions Runner** — Self-hosted runner déployé dans le cluster, permettant de déclencher des pipelines CI/CD directement sur l'infrastructure

### Registry
- **Docker Registry** — Registry privé hébergé dans le cluster pour les images des applications internes

---
## Structure Ansible

```
.
├── playbook.yaml
├── inventory
├── group_vars/
│   └── all/
│       └── vault.yml        # Secrets chiffrés via Ansible Vault
└── roles/
    ├── kubernetes/           # Installation et configuration de kubeadm
    │   ├── configure_iptables.yaml
    │   ├── disable_swap.yaml
    │   ├── install_packages.yaml
    │   └── setup_k8s.yaml
    ├── helm/                 # Installation de Helm
    ├── join_kubernetes/      # Jonction des workers au cluster
    ├── traefik/              # Déploiement Traefik via Helm
    ├── metallb/              # Déploiement MetalLB + configuration IP pool
    ├── longhorn/             # Stockage distribué
    ├── zalando-postgres-op/  # Opérateur PostgreSQL HA
    ├── falco/                # Sécurité runtime
    ├── monitoring/           # Prometheus + Grafana + Node Exporter
    ├── github-action/        # Self-hosted runner
    ├── docker-registry/      # Registry privé
    ├── frontend/             # Application frontend
    ├── backend/              # Application backend
    └── cartostage/
        ├── frontend/
        └── backend/

```


---

## Déploiement

### Prérequis

- Machine de contrôle sous Debian avec Ansible installé
- VMs Debian provisionnées sur Proxmox
- Échange de clés SSH effectué avec chaque nœud
- Droits `sudo` disponibles sur les nœuds cibles

### Lancer le déploiement

```bash
ansible-playbook -i inventory.ini ./playbooks/infrastructure.yaml -b --ask-become-pass --ask-vault-pass

```

### Déroulement du playbook

| Phase 										| Hôtes cibles| Rôles appliqués						|		 
|---------------------------|-------------|---------------------------|
|1 — Bootstrap Kubernetes		|Tous					|`kubernetes`, `helm`				|
|2 — Jonction des workers		|Workers			|`join_kubernetes`					|	
|3 — Déploiement de la stack|Master				|Tous les rôles applicatifs	|
----------

## Application hébergée

Ce cluster héberge **[CartoStage](https://github.com/MysterNathan/cartostage)**, une application de cartographie interactive des offres de stage, développée en **Next.js** et **Go**.

----------

## Perspectives d'évolution

-   Ajout de **tags Ansible** pour filtrer les déploiements par thématique
-   Mise en place d'un système de **GitOps** (ArgoCD / Flux)
-   Extension du load balancing MetalLB en mode **BGP**
