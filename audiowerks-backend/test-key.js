const axios = require('axios');
require('dotenv').config();

// This is the secret key from your .env file
const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;

// We will encode it in Base64, just like the example you found
const encodedKey = Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64');

console.log(`Testing with key ending in: ...${PAYMONGO_SECRET_KEY.slice(-4)}`);

const options = {
  method: 'GET',
  url: 'https://api.paymongo.com/v1/merchants/capabilities/payment_methods',
  headers: {
    accept: 'application/json',
    authorization: `Basic ${encodedKey}`
  }
};

axios
  .request(options)
  .then(res => {
    console.log('✅ SUCCESS! The API key is VALID.');
    console.log('Your account can use the following payment methods:');
    console.log(res.data);
  })
  .catch(err => {
    console.error('❌ FAILED. The API key is INVALID.');
    console.error('PayMongo responded with this error:');
    console.error(err.response?.data || err.message);
  });
