const axios = require('axios');

const BASE_URL = 'https://madam-nazar-location-api.herokuapp.com';

module.exports = {
  getCurrentLocation: () => axios.get(`${BASE_URL}/location/current`),
};
