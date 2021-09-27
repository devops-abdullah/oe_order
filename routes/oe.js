let express = require('express');
let router = express.Router();
let axios = require('axios');
let FormData = require('form-data');

let TOKEN = null;
let data = new FormData();
data.append('username', 'intellicon.insignia@gmail.com');
data.append('password', 'Admin@123');
data.append('grant_type', 'password');
let config = {
  method: 'post',
  url: 'https://oeprocessingstage.shopistan.pk/oauth/token',
  headers: {
    'Authorization': 'Basic c2hvcGlzdGFuQ2xpZW50QXBwOmxpYmlhbW9DYWxpY2k=',
    ...data.getHeaders()
  },
  data: data
};
axios(config)
  .then(response => {
    TOKEN = response.data.access_token;
  })
  .catch(e => {
    console.log(e)
  })


/* GET users listing. */
router.get('/:id/autoverify', function (req, res, next) {
  let orderId = req.params.id;
  console.log(orderId, TOKEN);
  let config = {
    method: 'get',
    url: `https://oeprocessingstage.shopistan.pk/orders/${ orderId }/autoverify`,
    headers: {
      'Authorization': `Bearer ${ TOKEN }`,
      'client_type': 'ivr'
    }
  };
  return axios(config)
    .then(resp => {
      console.log(resp.data)
      res.json(resp.data);
    })
    .catch(e => {
      res.status(500)
    })
});

router.get('/:id/dead', function (req, res, next) {
  let orderId = req.params.id;
  console.log(orderId, TOKEN);
  let config = {
    method: 'get',
    url: `https://oeprocessingstage.shopistan.pk/orders/${ orderId }/dead`,
    headers: {
      'Authorization': `Bearer ${ TOKEN }`,
      'client_type': 'ivr'
    }
  };
  return axios(config)
    .then(resp => {
      console.log(resp.data)
      res.json(resp.data);
    })
    .catch(e => {
      res.status(500)
    })
});

module.exports = router;
