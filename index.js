const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./app/routes/userRoutes');
const intrusionRoutes = require('./app/routes/intrusionRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const InternalMacAddress = require('./app/models/InternalMacAddress');
const { dhcpLogFilePath } = require('./config');
const watchDHCPLogs = require('./DHCP mock/dhcp');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware d'authentification global (avant la définition des routes)
// Cela protégera toutes les routes, sauf la route de login
//app.use(authMiddleware);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/intrusions', intrusionRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/PROJET_4NPM', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    watchDHCPLogs(dhcpLogFilePath);
  });
})
.catch(err => console.error('Error connecting to MongoDB:', err));

// save multiple InternalMacAddress documents
const saveInternalMacAddress = () => {
  InternalMacAddress.insertMany([
    { macAddress: '0001.632C.299C' },
    { macAddress: '0012.349A.2F43' },
    { macAddress: '00A0.D3B2.91E7' },
  ])
  .then(() => console.log('InternalMacAddress documents saved'))
  .catch(err => console.error('Error saving InternalMacAddress documents:', err));
}