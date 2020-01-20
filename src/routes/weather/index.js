const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const API_URL = 'https://api.darksky.net/forecast/';
const { DARK_SKY_API_KEY } = process.env;
const icons = {
  'clear-day': 'Sun',
  'clear-night': 'Moon',
  'rain': 'Cloud-Rain',
  'snow': 'Cloud-Snow-Alt',
  'sleet': 'Cloud-Drizzle',
  'wind': 'Wind',
  'fog': 'Cloud-Fog',
  'cloudy': 'Cloud',
  'partly-cloudy-day': 'Cloud-Sun',
  'partly-cloudy-night': 'Cloud-Moon',
};
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDayOfWeek = (time) => {
  const day = new Date(time);
  return weekday[(day.getUTCDay() + 1) % weekday.length];
};

router.get('/', (req, res) => {
  res.json({
    status: 200,
    msg: 'Weather API. Use /[latitude]/[longitude] to get the current and next 3 days weather.',
  });
});

router.get('/:latitude/:longitude', async (req, res, next) => {
  const { latitude, longitude } = req.params;
  const URL = `${API_URL}${DARK_SKY_API_KEY}/${latitude},${longitude}`;
  try {
    console.log(URL);
    const { data } = await axios.get(URL);
    const nextDays = data.daily.data.slice(0, 3);
    const next3Days = nextDays.map((day) => ({
      day: getDayOfWeek(day.time * 1000),
      icon: icons[day.icon],
      condition: day.summary,
      temperatureLow: Math.round(day.temperatureLow),
      temperatureHigh: Math.round(day.temperatureHigh),
      apparentTemperatureLow: Math.round(day.apparentTemperatureLow),
      apparentTemperatureHigh: Math.round(day.apparentTemperatureHigh),
    }));
    const { timezone, currently: { summary, icon, temperature, apparentTemperature } } = data;
    res.json({
      timezone,
      condition: summary,
      icon: icons[icon],
      temperature: Math.round(temperature),
      feelsLike: Math.round(apparentTemperature),
      next3Days,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
