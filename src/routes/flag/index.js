const axios = require('axios');
const express = require('express');
require('dotenv').config();

const router = express.Router();

const getFlagStatusList = async () => {
  const { data } = await axios('http://api.fatherstorm.com/flag.php');
  return data.map((el) => {
    return {
      start: new Date(el.start),
      end: new Date(el.end),
      info: el.short,
    };
  });
};

const checkFlagStatusToday = async (flags) => {
  const today = new Date();
  for (let day of flags) {
    if (day.start <= today && day.end >= today) {
      return day;
    }
  }
  return null;
};

router.get('/', async (req, res, next) => {
  try {
    const flags = await getFlagStatusList();
    const todayFlagStatus = await checkFlagStatusToday(flags);
    res.json({
      position: todayFlagStatus ? 'half' : 'full',
      presidentialAction: todayFlagStatus,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
