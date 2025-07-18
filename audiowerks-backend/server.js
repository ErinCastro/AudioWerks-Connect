// server.js
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PAYMONGO_SECRET_KEY = 'sk_test_DRmuHw9TNtbMSQ4ob7Uo16od'; // secret key

app.post('/create-payment', async (req, res) => {
  console.log('Received payment request:', req.body);
  console.log('Using PayMongo Secret Key:', PAYMONGO_SECRET_KEY);
  const { amount, currency, type, description } = req.body;
  try {
    const response = await axios.post(
      'https://api.paymongo.com/v1/payment_intents',
      {
        data: {
          attributes: {
            amount: amount, // in centavos (e.g., 10000 = 100 PHP)
            payment_method_allowed: [type], // e.g., 'gcash', 'card'
            payment_method_options: {},
            currency: currency || 'PHP',
            description: description || 'Audiowerks Booking'
          }
        }
      },
      {
        auth: {
          username: PAYMONGO_SECRET_KEY,
          password: ''
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: err.response.data });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));