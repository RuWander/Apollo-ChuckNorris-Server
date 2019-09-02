const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/'
  }

  async getUserById(id) {
    return this.get(`users/${id}`)
      .then(user => {
        delete user.password
        return user;
      })
  }

  async getUserByEmail(email) {
    return this.get(`users?email=${email}`)
      .then(res => {
        const user = res[0];
        if (user === undefined) {
          return false
        }
        return user;
      })
      .catch(err => console.log(err))
  }

  async addUser(username, email, password) {
    return this.post(`users`,
      {
        username,
        email,
        password
      })
      .then(user => {
        return user;
      })
  }

}

module.exports = UserAPI