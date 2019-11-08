import axios from 'axios'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql'
import CompanyType from './company'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: { 
      type: CompanyType,
      resolve(parentValue, args){
        return axios.get(`http://localhost:6000/companies/${parentValue.companyId}`)
          .then(resp => resp.data)
      }
    }
  })
})

export default UserType