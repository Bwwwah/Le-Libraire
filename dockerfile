# Utiliser une image de base officielle de Node.js
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port que votre application utilise (par exemple, 3000)
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["index.js"]
