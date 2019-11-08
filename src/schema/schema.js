import axios from 'axios'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} from 'graphql'

import CompanyType from '../types/company'
import UserType from '../types/user'

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
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:6000/companies/${args.id}`)
          .then(resp => resp.data)
      }
    }
  }
})

// const Mutuation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addUser: {
//       type: UserType,
//       args: {
//         firstName: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         commanyId: { type: GraphQLString }
//       },
//       resolve() {

//       }
//     }
//   }
// })

export default new GraphQLSchema({
  query: RootQuery
})