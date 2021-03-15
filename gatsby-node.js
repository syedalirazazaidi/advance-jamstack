const path = require("path")
exports.createPages = async function ({ graphql, actions }) {
  const query = await graphql(`
    query {
      getVCard {
        getVCard {
          id
          c1
          c2
          c3
          recField
          senderField
          messageField
          link
        }
      }
    }
  `)

  const posts = query.data.getVCard.getVCard

  posts.map(async card => {
    console.log(card.link, "p!!!!!!")
    await actions.createPage({
      path: `showlolli/${card.link}`,
      component: require.resolve(`./src/templates/VirtualTemplate`),
      context: card,
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  console.log("pageAAAAAIA", page.path.match(/^\/showlolli/))

  if (page.path.match(/^\/showlolli/)) {
    page.matchPath = "/showlolli/*"

    createPage(page)
  }
}
