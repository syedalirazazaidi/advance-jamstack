const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb"),
  q = faunadb.query

axios = require("axios")
const shortid = require("shortid")
var dotenv = require("dotenv")
dotenv.config()

const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})
const typeDefs = gql`
  type Query {
    getVCard: [VCard!]
    getLolliLink(path: String!): [VCard!]
  }
  type VCard {
    c1: String!
    c2: String!
    c3: String!
    recField: String!
    senderField: String!
    messageField: String!
    link: String!
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
    getVCard: async args => {
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("tech"))),
            q.Lambda(x => q.Get(x))
          )
        )

        return result.data.map(data => ({
          id: data.ts,
          c1: data.data.c1,
          c2: data.data.c2,
          c3: data.data.c3,
          recField: data.data.recField,
          senderField: data.data.senderField,
          messageField: data.data.messageField,
          link: data.data.link,
        }))
      } catch (error) {
        console.log(error)
      }
    },

    getLolliLink: async (_, { path }) => {
      console.log(path, "__link")
      if (!path) {
        return []
      } else {
        try {
          const result = await client.query(
            q.Get(q.Match(q.Index("new_lollie_enjoy"), path)),
            q.Lambda(x => q.Get(x))
          )
          return [result.data]
        } catch (error) {
          console.log(error)
        }
      }
    },
  },

  Mutation: {
    addVCard: async (
      _,
      // args
      { c1, c2, c3, recField, senderField, messageField }
    ) => {
      try {
        const result = await client.query(
          q.Create(
            q.Collection("tech"),

            {
              data: {
                c1,
                c2,
                c3,
                recField,
                senderField,
                messageField,
                link: shortid.generate(),
              },
            }
          )
        )

        console.log(result.data, "success-ful 000created")
        return result.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
exports.handler = server.createHandler()
