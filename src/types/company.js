import axios from 'axios'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import UserType from './user'

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return axios.get(`http://localhost:6000/companies/${parentValue.id}/users`)
          .then(resp => resp.data)      }
    }
  })
})

export default CompanyType