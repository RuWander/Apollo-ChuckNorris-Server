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
    return this.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
  }
}

module.exports = ChuckNorrisAPI