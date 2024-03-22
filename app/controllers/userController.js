const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');

// Fonction pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la création de l\'utilisateur' });
  }
};

// Fonction pour authentifier un utilisateur
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Rechercher l'utilisateur dans la base de données
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    // Créer et renvoyer le token JWT
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion' });
  }
};

// Fonction pour déconnecter un utilisateur
exports.logoutUser = async (req, res) => {
  try {
    // Implémentez votre logique de déconnexion ici, par exemple, effacez le token JWT du client

    res.status(200).json({ message: 'Utilisateur déconnecté avec succès' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la déconnexion' });
  }
};
