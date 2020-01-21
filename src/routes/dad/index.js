const axios = require('axios');
const express = require('express');
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { data: { joke } } = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json',
      },
    });
    res.json({
      status: 200,
      joke,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
