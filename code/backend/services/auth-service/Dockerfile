# auth-service/Dockerfile

# ================================
# Stage 1: Builder
# ================================
FROM golang:1.24.4-alpine AS builder

# Installer les dépendances système nécessaires
RUN apk add --no-cache git ca-certificates tzdata

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY go.mod go.sum ./

# Télécharger les dépendances
RUN go mod download

# Copier tout le code source
COPY . .

# Construire l'application
# CGO_ENABLED=0 pour un binaire statique
# GOOS=linux pour s'assurer que c'est pour Linux
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server/main.go

# ================================
# Stage 2: Production
# ================================
FROM alpine:3.22

# Installer les certificats CA pour les requêtes HTTPS
RUN apk --no-cache add ca-certificates tzdata

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Définir le répertoire de travail
WORKDIR /app

# Copier le binaire depuis le stage builder
COPY --from=builder /app/main .

# Copier les fichiers de configuration si nécessaire
# COPY --from=builder /app/config ./config

# Changer les permissions
RUN chown -R appuser:appgroup /app

# Utiliser l'utilisateur non-root
USER appuser

# Exposer le port
EXPOSE 8081

# Définir les variables d'environnement par défaut
ENV GIN_MODE=release
ENV PORT=8081

# Commande pour démarrer l'application
CMD ["./main"]
