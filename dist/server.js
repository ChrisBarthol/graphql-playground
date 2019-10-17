'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var expressGraphQL = _interopDefault(require('express-graphql'));
var axios = _interopDefault(require('axios'));
var graphql = require('graphql');

const CompanyType = new graphql.GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString }
  }
});

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    firstName: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt },
    company: { 
      type: CompanyType,
      resolve(parentValue, args){
        return axios.get(`http://localhost:6000/companies/${parentValue.companyId}`)
          .then(resp => resp.data)
      }
    }
  }
});

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: graphql.GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:6000/users/${args.id}`)
          .then(resp => resp.data)
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: graphql.GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:6000/companies/${args.id}`)
          .then(resp => resp.data)
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

app.listen(4000, () => {});
