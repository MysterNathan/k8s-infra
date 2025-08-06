# frontend/docker/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copier le code source
COPY . .

# Build de l'application React
RUN npm run build

# Exposer le port
EXPOSE 80

CMD ["npm", "run", "start"]
