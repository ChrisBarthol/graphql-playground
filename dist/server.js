'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var expressGraphQL = _interopDefault(require('express-graphql'));
var axios = _interopDefault(require('axios'));
var graphql = require('graphql');

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
  })
});

const CompanyType = new graphql.GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    users: {
      type: new graphql.GraphQLList(UserType),
      resolve(parentValue, args){
        return axios.get(`http://localhost:6000/companies/${parentValue.id}/users`)
          .then(resp => resp.data)      }
    }
  })
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

const Mutuation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        age: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        commanyId: { type: graphql.GraphQLString }
      },
      resolve(parentValue, { firstName, age }) {
        return axios.post('http://localhost:6000/users', { firstName, age })
          .then(resp => resp.data)
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:6000/users/${id}`, )
          .then(resp => resp.data)
      }    
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        firstName: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        commanyId: { type: graphql.GraphQLString }
      },
      resolve(parentValue, args ) {
        return axios.patch(`http://localhost:6000/users/${args.id}`, args )
          .then(resp => resp.data)
      }    
    }
  }
});

var schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutuation
});

const app = express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4000, () => {});
