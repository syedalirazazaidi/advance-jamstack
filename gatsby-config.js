/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    // "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "getVCard",
        // Field under which the remote schema will be accessible. You'll use this in your
        //  Gatsby query
        fieldName: "getVCard",
        // Url to query from
        // url: "https://api.github.com/graphql",
        url: "https://virtualpop.netlify.app/.netlify/functions/card",
        // https://virtualpop.netlify.app
      },
    },
  ],
}
