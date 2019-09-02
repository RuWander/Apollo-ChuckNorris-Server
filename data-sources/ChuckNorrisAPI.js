const { RESTDataSource } = require('apollo-datasource-rest');

class ChuckNorrisAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.chucknorris.io/jokes/'
  }

  async getCategories() {
    return this.get('categories');
  }

  async getQuoteForCategory(category) {
    return this.get(`random?category=${category}`)
  }

  async getRandomQuote() {
    return this.get('random')
  }
}

module.exports = ChuckNorrisAPI