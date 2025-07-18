// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Add this line at the top
const app = express();

// --- Middleware Setup ---
// 1. CORS: Must be first to handle preflight requests
app.use(cors({ origin: 'http://127.0.0.1:5522' }));

// 2. Body Parser: To read JSON from requests
app.use(express.json());
// --- End Middleware Setup ---

const PAYMONGO_SECRET_KEY = 'sk_test_LzjR2Ebsst23XjjngqKW4T1g';
const PAYMONGO_PUBLIC_KEY = 'pk_test_MnKdN6afS21jSD6mUaGiwzy2'; // Your public key

app.post('/create-payment', async (req, res) => {
  const { amount, type, description } = req.body;
  try {
    const response = await axios.post(
      'https://api.paymongo.com/v1/payment_intents',
      {
        data: {
          attributes: {
            amount: amount,
            payment_method_allowed: [type],
            currency: 'PHP',
            description: description || 'Audiowerks Booking'
          }
        }
      },
      {
        auth: {
          username: PAYMONGO_SECRET_KEY,
          password: ''
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err });
  }
});

app.post('/paymongo-gcash', async (req, res) => {
  const { amount, description, name, email } = req.body;
  try {
    // 1. Create payment intent
    const intentRes = await axios.post(
      'https://api.paymongo.com/v1/payment_intents',
      {
        data: {
          attributes: {
            amount: amount,
            payment_method_allowed: ['gcash'],
            currency: 'PHP',
            description: description || 'Audiowerks Booking'
          }
        }
      },
      {
        auth: {
          username: PAYMONGO_SECRET_KEY,
          password: ''
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const intent = intentRes.data.data;

    // 2. Create GCash payment method
    const pmRes = await axios.post(
      'https://api.paymongo.com/v1/payment_methods',
      {
        data: {
          attributes: {
            type: 'gcash',
            billing: {
              name: name || 'Customer Name',
              email: email || 'customer@email.com'
            }
          }
        }
      },
      {
        auth: {
          username: PAYMONGO_PUBLIC_KEY,
          password: ''
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const paymentMethod = pmRes.data.data;

    // 3. Attach payment method to payment intent
    const attachRes = await axios.post(
      `https://api.paymongo.com/v1/payment_intents/${intent.id}/attach`,
      {
        data: {
          attributes: {
            payment_method: paymentMethod.id,
            client_key: intent.attributes.client_key
          }
        }
      },
      {
        auth: {
          username: PAYMONGO_PUBLIC_KEY,
          password: ''
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const attachData = attachRes.data.data;

    // 4. Return the redirect URL to the frontend
    const redirectUrl = attachData.attributes.next_action.redirect.url;
    res.json({ redirectUrl });
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));