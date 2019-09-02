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
  
  async getQuotesBySearch(search) {
    const data = await this.get(`search?query=${search}`)
    return data.result
  }
}

module.exports = ChuckNorrisAPI