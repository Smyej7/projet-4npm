const { body } = require('express-validator');

// Fonction de validation des données d'entrée pour la création d'un utilisateur
exports.validateUser = [
  // Express Validator middleware pour valider les données d'entrée
  body('username').notEmpty().withMessage('Le nom d\'utilisateur est requis'),
  body('password').notEmpty().withMessage('Le mot de passe est requis'),
  // Votre logique de contrôle supplémentaire peut être ajoutée ici
];