const express = require('express');
require('dotenv').config();

const weather = require('./routes/weather');

const app = express();
const port = process.env.PORT || 3000;

app.use('/weather', weather);

app.get('/', (req, res) => {
  res.json({
    status: 200,
    hello: 'world!',
  });
});

app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    msg: 'Endpoint not found!',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    msg: err.message || 'Something broke!',
  });
});

app.listen(port, () => console.log(`Listening at port ${port}`));
