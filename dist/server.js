'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var expressGraphQL = _interopDefault(require('express-graphql'));
var _ = _interopDefault(require('lodash'));
var graphql = require('graphql');

const users = [
  { id: '23', firstName: 'Bill', lastName: 'Fun', age: 20 },
  { id: '47', firstName: 'Jill', lastName: 'Fun', age: 22 },
];

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    firstName: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt }
  }
});

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: graphql.GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id })
      }
    }
  }
});

var schema = new graphql.GraphQLSchema({
  query: RootQuery
});

const app = express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log(schema);
});
