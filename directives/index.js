const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');
const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [, , context] = args
      console.log(context.token)

      if (!context.token) {
        throw new AuthorizationError({
          message: 'You must supply a JWT for authorization!'
        });
      }
      try {
        const decoded = jwt.verify(
          context.token.replace('Bearer ', ''),
          process.env.JWT_SECRET
        );
        return resolve.apply(this, args)
      } catch (err) {
        throw new AuthorizationError({
          message: 'You are not authorized.'
        });
      }

    }
  }

  visitObject() {

  }

}

module.exports = {
  AuthDirective
}