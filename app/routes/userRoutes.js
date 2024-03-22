const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../../validators/userValidation');
const { handleValidationErrors } = require('../../validators/validationHandler');

// Route pour créer un nouvel utilisateur
router.post('/', validateUser, handleValidationErrors, userController.createUser);

// Route pour l'authentification de l'utilisateur
router.post('/login', validateUser, handleValidationErrors, userController.loginUser);

// Route pour la déconnexion de l'utilisateur
router.post('/logout', userController.logoutUser);

module.exports = router;
