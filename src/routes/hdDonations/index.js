const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const router = express.Router();

router.get('/transactions', async (req, res, next) => {
  try {
    const { data } = await stripe.balanceTransactions.list();
    console.log(data);
    const transactions = data.map((transaction) => {
      return {
        id: transaction.id,
        amount: transaction.net,
        created: transaction.created,
      };
    });
    res.json({
      status: 200,
      transactions,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/transactions/month', async (req, res, next) => {
  try {
    const { data } = await stripe.balanceTransactions.list();
    const transactions = data.reduce((acc, cur) => {
      const date = new Date();
      const firstDayOfMonth = Date.UTC(date.getFullYear(), date.getMonth(), 1);
      if (Number(cur.created * 1000) >= Number(firstDayOfMonth)) {
        return [
          ...acc,
          {
            id: cur.id,
            amount: cur.net,
            created: cur.created,
          },
        ];
      }
      return [...acc];
    }, []);
    res.json({
      status: 200,
      transactions,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/charge', async (req, res, next) => {
  try {
    await stripe.charges.create({
      amount: req.body.amount,
      description: req.body.description,
      currency: req.body.currency,
      source: req.body.source,
      receipt_email: req.body.email,
    });
    res.json({
      status: 200,
      message: `${req.body.email} successfully charged for $${(req.body.amount / 100).toFixed(2)}`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
