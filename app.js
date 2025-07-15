const express = require('express');
const cors = require('cors');
const stockRoutes = require('./routes/stock.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/stock', stockRoutes);

app.get('/', (req, res) => res.send('AI Financial Bot is running'));

module.exports = app;
