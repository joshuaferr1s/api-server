const express = require('express');
const GoogleSpreadsheet = require('google-spreadsheet');

const router = express.Router();
const doc = new GoogleSpreadsheet('1lwnfa-GlNRykWBL5y7tWpLxDoCfs8BvzWxFjeOZ1YJk');

const getInfo = () => {
  return new Promise((resolve, reject) => {
    doc.getInfo((err, info) => {
      if (err) return reject(err);
      return resolve(info);
    });
  });
};

const getRows = (worksheet = 1, options = {}) => {
  return new Promise((resolve, reject) => {
    doc.getRows(worksheet, options, (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
};

const getData = (rows) => {
  let totalCases = 0;
  let totalDeaths = 0;
  const data = rows.map((el) => {
    const curCases = parseInt(el.confirmedcases);
    const curDeaths = parseInt(el.reporteddeaths);
    totalCases += curCases ? curCases : 0;
    totalDeaths += curDeaths ? curDeaths : 0;

    return {
      country: el.country,
      confirmedCases: +el.confirmedcases,
      reportedDeaths: +el.reporteddeaths,
    };
  });
  return {
    countryData: data,
    totalCases,
    totalDeaths,
    fatalityRate: (totalDeaths / totalCases * 100).toFixed(2),
  };
};

const getVirusData = async () => {
  const { author } = await getInfo();
  const rows = await getRows();
  return {
    dataSource: {
      author,
      link: 'https://spreadsheets.google.com/feeds/worksheets/1lwnfa-GlNRykWBL5y7tWpLxDoCfs8BvzWxFjeOZ1YJk/public/values',
    },
    ...getData(rows),
  };
};

router.get('/', async (req, res, next) => {
  try {
    const data = await getVirusData();
    res.json({
      status: 200,
      ...data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
