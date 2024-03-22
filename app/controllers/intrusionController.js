const Intrusion = require('../models/Intrusion');

// Fonction pour récupérer toutes les intrusions
exports.getAllIntrusions = async (req, res) => {
  try {
    // Récupérer toutes les intrusions depuis la base de données
    const intrusions = await Intrusion.find();

    res.status(200).json(intrusions);
  } catch (error) {
    console.error('Error retrieving intrusions:', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des intrusions' });
  }
};
