import React from "react"
import PropTypes from "prop-types"

import { useQuery } from "@apollo/client"

// query GetExchangeRates {
//   rates(currency: "USD") {
//     currency
//     rate
//   }
// }

import gql from "graphql-tag"
const GET_LOLLIES = gql`
  query($link: String) {
    getLolliLink(link: $link) {
      c1
      c2
      c3
      recField
      senderField
      messageField
      link
    }
  }
`

const NewLolli = props => {
  const { loading, error, data } = useQuery(GET_LOLLIES)
  if (loading)
    return (
      <h2
        style={{
          marginTop: "60px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        Loading...
      </h2>
    )

  if (error) {
    console.log(error, "ELOLO")
    return <h2>Error</h2>
  }
  if (data) console.log(data.link, "DATA")
  // console.log(vollidata, "POPOPP")
  return <div>NewLolli</div>
}

NewLolli.propTypes = {}

export default NewLolli
