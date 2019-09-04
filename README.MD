# APOLLO GraphQL Server

This is a simple GraphQl server that wraps the Chuck Norris jokes REST API. All of the Chuck Norris API endpoint can be queries through this GraphQL server.

This server also has basic authentication with JWT built in with custom directives that can be used to protect on the field level as well as on the query level.

## Getting started

To get started install all of the dependencies by running:

```javascript
npm install
```

Create a .env file and add a JWT Secret

```javascript
JWT_SECRET=ASuperStrongSecret
```

**Start the server with:**

_It is important to start the server first if you are viewing this in [CodeSandbox](https://codesandbox.io)._

```javascript
npm run server
```

**Start the Database with:**

_This is just a test database that hold the users. It can easily be a substituted an actual database._

```javascript
npm run db
```

The database is just a json-server that watches the db.json folder. It exposes REST endpoint to query the data.

