// const path = require(`path`)

// const makeRequest = (graphql, request) =>
//   new Promise((resolve, reject) => {
//     // Query for nodes to use in creating pages.
//     resolve(
//       graphql(request).then(result => {
//         if (result.errors) {
//           reject(result.errors)
//         }

//         return result
//       })
//     )
//   })
exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
     get_lollies{ getVCard {
                       link
      }}
    }
  `)
  console.log(JSON.stringify(result, null, 4))
// const path = require("path")

// exports.createPages = async ({ actions, graphql }) => {
//   const {data} = await graphql(
//     `
        
//           getVCard {
//             id
//             c1
//             c2
//             c3
//             recField
//             senderField
//             messageField
//             link
//           }
        
      
//     `
//   )

//   console.log("data in node", data)

  // data.data.lollies.lollies.forEach(({ lollyPath }) => {
  //   console.log("lollyPath", lollyPath)
  //   actions.createPage({
  //     path: `/lollies/${lollyPath}`,
  //     component: path.resolve("./src/templates/lollyTemplate.tsx"),
  //     context: {
  //       lollyPath: lollyPath,
  //     },
  //   })
  // })
}

// // Implement the Gatsby API “createPages”. This is called once the
// // data layer is bootstrapped to let plugins create pages from data.
// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions

//   const getArticles = makeRequest(
//     graphql,
//     `
//     {
//       getVCard {
//         id
//     c1
//     c2
//     c3
//     recField
//     senderField
//     messageField
//     link
//       }
//     }
//     `
//   ).then(result => {
//     console.log(result, ")))))))))))))00")
//     // Create pages for each article.
//     // result.data.allStrapiArticle.edges.forEach(({ node }) => {
//     //   createPage({
//     //     path: `/${node.id}`,
//     //     component: path.resolve(`src/templates/article.js`),
//     //     context: {
//     //       id: node.id,
//     //     },
//     //   })
//     // })
//   })

//   // Query for articles nodes to use in creating pages.
//   return getArticles
// }
