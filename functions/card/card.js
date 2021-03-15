const { ApolloServer, gql } = require("apollo-server-lambda")
const shortid = require("shortid")
var dotenv = require("dotenv")
dotenv.config()
const faunadb = require("faunadb"),
  q = faunadb.query

const typeDefs = gql`
  type Query {
    getVCard: [VCard!]
    getLolliLink(link: String!): [VCard!]
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
    getVCard: async args => {
      try {
        // access faunadb
        const client = new faunadb.Client({
          secret: process.env.FAUNA_SERVER_SECRET,
        })
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lolly_link"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data, "put")
        return result.data.map(data => {
          return {
            id: data.ref.id,
            c1: data.data.c1,
            c2: data.data.c2,
            c3: data.data.c3,
            recField: data.data.recField,
            senderField: data.data.senderField,
            messageField: data.data.messageField,
            link: data.data.link,
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    getLolliLink: async (_, { link }) => {
      console.log(link, "link")
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNA_SERVER_SECRET,
        })
        // const result = await client.query(q.Get(q.Match(q.Index("tech"), link)))
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lolly_link"), link)),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result, "get")
        return result.data.map(data => {
          console.log(data, "data.link")
          return {
            c1: data.data.c1,
            c2: data.data.c2,
            c3: data.data.c3,
            recField: data.data.recField,
            senderField: data.data.senderField,
            messageField: data.data.messageField,
            link: data.data.link,
          }
        })
      } catch (error) {
        console.log(error)
      }
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
              link: shortid.generate(),
            },
          })
        )

        console.log(result, "pop")
        return {
          id: result.ref.id,
          c1: result.data.c1,
          c2: result.data.c2,
          c3: result.data.c3,
          recField: result.data.recField,
          senderField: result.data.senderField,
          messageField: result.data.messageField,
          link: result.data.link,
        }
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
