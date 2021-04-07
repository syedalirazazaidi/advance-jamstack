const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb"),
  q = faunadb.query

axios = require("axios")
const shortid = require("shortid")
var dotenv = require("dotenv")
dotenv.config()
// const client = new faunadb.Client({
//   secret: "fnAEFI6N-CACCbq11AJxqfdZymwJ-N352pZjiFlg",
// })

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
// fnAEFI6N-CACCbq11AJxqfdZymwJ-N352pZjiFlg
// old fnAEBmGkQfACCUcs3WGozlUSDt6f5KoHXsdUcB7-

// fnAEFI6N-CACCbq11AJxqfdZymwJ-N352pZjiFlg

const resolvers = {
  Query: {
    getVCard: async args => {
      // const client = new faunadb.Client({
      //   secret: process.env.FAUNA_SERVER_SECRET,
      // })
      const client = new faunadb.Client({
        secret: "fnAEBmGkQfACCUcs3WGozlUSDt6f5KoHXsdUcB7-",
      })
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("tech"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result, "OOOp")
        // access faunadb
        // const result = await client.query(
        //   q.Map(
        //     q.Paginate(q.Match(q.Index("link"))),
        //     q.Lambda(x => q.Get(x))
        //   )
        // )
        // console.log(result, "pppput")
        // return result.data
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
          const client = new faunadb.Client({
            secret: "fnAEBmGkQfACCUcs3WGozlUSDt6f5KoHXsdUcB7-",
          })
          const result = await client.query(
            // q.Get(q.Match(q.Index("new_loly")), path)
            q.Get(q.Match(q.Index("new_lollie_enjoy"), path)),
            q.Lambda(x => q.Get(x))
          )
          return [result.data]
          // console.log(result.data, "RESULTTTTTTT")
          // return result.data.map(data =>
          //   console.log(
          //     data,
          //     "lplp"
          //   )({
          //     c1: data.data.c1,
          //     c2: data.data.c2,
          //     c3: data.data.c3,
          //     recField: data.data.recField,
          //     senderField: data.data.senderField,
          //     messageField: data.data.messageField,
          //     link: data.data.link,
          //   })
          // )
          // .then(ret => console.log(ret, "{}"))

          // const result = await client.query(
          //   q.Map(
          //     q.Paginate(q.Match(q.Index("vertual_pop"))),
          //     q.Lambda(x => q.Get(x))
          //   )
          // )
          // .then(ret => {
          //   console.log(ret, "RETRY")
          // })
          // console.log(result.data, "tuja wasta hai aa ja")

          // const result = await client.query(q.Get(q.Match(q.Index("link"), link)))
          // const results = await client.query(
          //   q.Map(
          //     q.Paginate(q.Match(q.Index("link"), linkpath)),
          //     q.Lambda(x => q.Get(x))
          //   )
          // )
          // await client
          //   .query(
          //     q.Map(
          //       q.Paginate(q.Match(q.Index("link"), linkpath)),
          //       q.Lambda(x => q.Get(x))
          //     )
          //   )
          //   .then(ret => {
          //     console.log(ret, "RETRY")
          //     return ret.data.map(data => {
          //       return {
          //         c1: data.data.c1,
          //         c2: data.data.c2,
          //         c3: data.data.c3,
          //         recField: data.data.recField,
          //         senderField: data.data.senderField,
          //         messageField: data.data.messageField,
          //         link: data.data.link,
          //       }
          //     })
          //   })
          // .then(ret => ret)
          // const results = await client.query(
          //   q.Paginate(q.Match(q.Index("lolly_link"), link))
          // )

          // console.log(results, "get")
          // return result.data.map(data => {
          //   console.log(data, "data-----.link")
          //   return {
          //     c1: data.data.c1,
          //     c2: data.data.c2,
          //     c3: data.data.c3,
          //     recField: data.data.recField,
          //     senderField: data.data.senderField,
          //     messageField: data.data.messageField,
          //     link: data.data.link,
          //   }
          // })
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
        const client = new faunadb.Client({
          secret: "fnAEBmGkQfACCUcs3WGozlUSDt6f5KoHXsdUcB7-",
        })
        // const id = shortid.generate()
        // args.link = id
        const result = await client.query(
          q.Create(
            q.Collection("tech"),
            // data: args,
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
        // return {
        //   c1: result.data.c1,
        //   c2: result.data.c2,
        //   c3: result.data.c3,
        //   recField: result.data.recField,
        //   senderField: result.data.senderField,
        //   messageField: result.data.messageField,
        //   link: result.data.link,
        // }
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
