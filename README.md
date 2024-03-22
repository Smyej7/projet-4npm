# Projet 4NPM - README

Ce projet consiste en la création d'une application backend en utilisant Node.js, Express, et MongoDB pour mettre en place un système de surveillance réseau permettant de détecter les intrusions dans un réseau.

## Installation

1. Assurez-vous d'avoir Node.js et MongoDB installés sur votre machine.

2. Clonez ce dépôt sur votre machine :

git clone https://github.com/youssef/projet-4npm.git

3. Accédez au répertoire du projet :

cd projet-4npm

4. Installez les dépendances du projet en exécutant la commande suivante :

npm install

## Configuration

1. Assurez-vous que MongoDB est en cours d'exécution sur votre machine.

2. Modifiez le fichier `config.js` pour configurer votre base de données MongoDB et votre clé secrète JWT :
```javascript
module.exports = {
  secretKey: 'votre-clé-secrète',
  mongoURI: 'mongodb://localhost:27017/PROJET_4NPM',
};
```

## Lancement du serveur

1. Lancez le serveur en exécutant la commande suivante :

node index.js

2. Le serveur sera maintenant accessible à l'adresse http://localhost:3000.

## Utilisation des routes

1. Création d'un nouvel utilisateur :
    Endpoint: POST /api/users
    Corps de la requête: { "username": "nom_utilisateur", "password": "mot_de_passe" }

2. Authentification de l'utilisateur :
    Endpoint: POST /api/users/login
    Corps de la requête: { "username": "nom_utilisateur", "password": "mot_de_passe" }
    Le token JWT sera renvoyé dans la réponse.

3. Déconnexion de l'utilisateur :
    Endpoint: POST /api/users/logout
    Le token JWT doit être inclus dans les en-têtes de la requête pour être déconnecté.

4. Récupération des intrusions :
    Endpoint: GET /api/intrusions
    La liste de toutes les intrusions dans le réseau sera renvoyé dans la réponse.

## Exemple d'utilisation avec Postman

Importez la collection Postman fournie dans le répertoire postman de ce projet.

Utilisez les différentes requêtes de la collection pour tester les différentes fonctionnalités de l'API.

Assurez-vous d'inclure le token JWT dans les en-têtes des requêtes lorsque cela est nécessaire.