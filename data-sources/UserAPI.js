const { RESTDataSource } = require('apollo-datasource-rest');
const { AuthorizationError } = require('../errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

  async authenticateUser(email, password ) {
    return this.getUserByEmail(email)
      .then(existingUser => {
        if (!existingUser) {
          throw new AuthorizationError({
            message: `User with ${email} does not exist`
          });
        }
        const validPassword = bcrypt.compareSync(password, existingUser.password)
        if (validPassword) {
          const token = jwt.sign(existingUser.password, process.env.JWT_SECRET);
          delete existingUser.password
          return {
            user: existingUser,
            token: token
          }
        } else {
          throw new AuthorizationError({
            message: `User password did not match`
          });
        }
      })
  }

  async hashPasswordAndRegisterUser(user) {
    if (!user.email || !user.password) {
      throw new AuthorizationError({
        message: `Please provide an email and a password for successful registration`
      });
    }
  
    return this.getUserByEmail(user.email)
      .then(existingUser => {
        if (existingUser) {
          throw new AuthorizationError({
            message: `User with this email already exists`
          });
        }
        const hash = bcrypt.hashSync(user.password, 10)
        return this.addUser(user.username, user.email, hash)
      })
      .then(newUser => {
        const token = jwt.sign({ username: newUser.username }, process.env.JWT_SECRET || "my_super_strong_password")
        delete newUser.password
  
        const loginPayload = {
          user: newUser,
          token: token
        }
        return loginPayload
      })
      .catch(err => {
        return err
      })
  
  }

}

module.exports = UserAPI