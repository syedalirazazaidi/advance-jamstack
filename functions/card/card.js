const { ApolloServer, gql } = require("apollo-server-lambda")

var dotenv = require("dotenv")
dotenv.config()
const faunadb = require("faunadb"),
  q = faunadb.query

const typeDefs = gql`
  type Query {
    getVCard: [VCard!]
  }
  type VCard {
    id: ID!
    c1: String!
    c2: String!
    c3: String!
    recField: String!
    senderField: String!
    messageField: String!
    link: String
  }
  type Mutation {
    addVCard(
      c1: String!
      c2: String!
      c3: String!
      recField: String!
      senderField: String!
      messageField: String!
    ): VCard
  }
`

const resolvers = {
  Query: {
    getVCard: (root, args, context) => {
      return []
    },
  },
  Mutation: {
    addVCard: async (
      _,
      { c1, c2, c3, recField, senderField, messageField }
    ) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNA_SERVER_SECRET,
        })

        const result = await client.query(
          q.Create(q.Collection("tech"), {
            data: {
              c1,
              c2,
              c3,
              recField,
              senderField,
              messageField,

              // url: url,
              // description: description,
            },
          })
        )
        return result.ref.data
      } catch (error) {
        console.log(error)
      }
      // console.log("))))))))))")
      // console.log(c1, c2, c3, recField, senderField, messageField)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
exports.handler = server.createHandler()
