const axios = require('axios');

async function getCategories() {
  const categories = await axios
    .get('https://api.chucknorris.io/jokes/categories/')
    .then(res => {
      console.log(res.data)
      return res.data
    })
  return categories
}

module.exports = {
  getCategories
}