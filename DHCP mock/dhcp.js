const Tail = require('tail').Tail;
const InternalMacAddress = require('../app/models/InternalMacAddress');
const Intrusion = require('../app/models/Intrusion');

// Fonction pour surveiller les intrusions dans le fichier des logs DHCP
const watchDHCPLogs = (filePath) => {
  const tail = new Tail(filePath);

  tail.on('line', async (line) => {
    const logData = parseDHCPLog(line);
    // Vérifier si l'adresse MAC appartient à un appareil externe
    if (await isExternalDevice(logData.macAddress)) {
      // Déclencher une action pour gérer l'intrusion détectée
      console.log('Intrusion detected:', logData.macAddress);
      handleIntrusionDetected(logData);
    }
  });

  tail.on('error', (error) => {
    console.error('Error reading DHCP logs:', error);
  });
};

// Fonction pour extraire les informations pertinentes de la ligne de log DHCP
const parseDHCPLog = (line) => {
  // Exemple de structure de ligne de log : "March 14 13:33:26 medspx dhcpd: DHCPREQUEST for 192.168.62.41 from 0001.632C.299C via eth0b"
  const parts = line.split(' ');
  const timestamp = new Date(`${parts[0]} ${parts[1]} ${parts[2]}`);
  const ipAddress = parts[7];
  const macAddress = parts[9];
  
  return {
    timestamp,
    ipAddress,
    macAddress,
  };
};

// Fonction pour vérifier si l'appareil est externe
const isExternalDevice = async (macAddress) => {
    // Implémentez votre logique pour vérifier si l'adresse MAC appartient à un appareil externe
    let internalMacAddress = await InternalMacAddress.findOne({ macAddress });
    if (internalMacAddress) {
      console.log('is internal:', macAddress);
      return false;
    }
    console.log('is not internal:', macAddress);
    return true;
};

// Fonction pour gérer l'intrusion détectée
const handleIntrusionDetected = async (logData) => {
    // Enregistrer l'intrusion dans la base de données
    let intrusion = new Intrusion({
        ipAddress: logData.ipAddress,
        macAddress: logData.macAddress,
        timestamp: logData.timestamp,
    });
    await intrusion.save();
};

module.exports = watchDHCPLogs;
