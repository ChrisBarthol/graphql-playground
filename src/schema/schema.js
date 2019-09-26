import axios from 'axios'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} from 'graphql'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:6000/users/${args.id}`)
          .then(resp => resp.data)
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery
})