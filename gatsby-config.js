/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
var baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8888"
    : "https://virtualpop.netlify.app"

console.log(process.env.NODE_ENV, "____________________________")
module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "GETVCARD",
        // Field under which the remote schema will be accessible. You'll use this in your
        //  Gatsby query
        fieldName: "get_lollies",
        // Url to query from
        url: `http://virtualpop.netlify.app/.netlify/functions/card`,
        // https://virtualpop.netlify.app
      },
    },
  ],
}
