const jwt = require('jsonwebtoken');
const User = require('../app/models/User');
const { secretKey } = require('../config');

const authMiddleware = async (req, res, next) => {
  // Récupérer le token d'authentification depuis les en-têtes de la requête
  const token = req.header('Authorization');

  if (req.path === '/api/users/login') {
    // Si c'est le cas, passer la requête sans vérification d'authentification
    return next();
  }

  // Vérifier si le token est présent
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé - Token manquant' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, secretKey);

    // Récupérer l'utilisateur associé à ce token
    const user = await User.findById(decoded.userId);

    // Vérifier si l'utilisateur existe
    if (!user) {
      throw new Error();
    }

    // Attacher l'utilisateur à l'objet de requête pour une utilisation ultérieure
    req.user = user;
    next(); // Passer au middleware suivant
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Accès non autorisé - Token invalide' });
  }
};

module.exports = authMiddleware;
