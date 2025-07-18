const axios = require('axios');
const PAYMONGO_SECRET_KEY = 'sk_test_LzjR2Ebsst23XjjngqKW4T1g';

axios.post(
  'https://api.paymongo.com/v1/payment_intents',
  {
    data: {
      attributes: {
        amount: 10000,
        payment_method_allowed: ['gcash'],
        currency: 'PHP'
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
).then(res => {
  console.log(res.data);
}).catch(err => {
  console.error(err.response?.data || err);
});
