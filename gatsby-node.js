const path = require("path")
exports.createPages = async function ({ graphql, actions }) {
  const query = await graphql(`
    query {
      getVCard {
        getVCard {
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
    await actions.createPage({
      path: `/${card.link}`,
      component: require.resolve(`./src/templates/VirtualTemplate`),
      context: card,
    })
  })
}
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/showlolli/)) {
    page.matchPath = "/showlolli/*"

    createPage(page)
  }
}
