import React from "react"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"

import VirtualTemplate from "../templates/VirtualTemplate"

const GET_VOLLY_BY_ID = gql`
  query getLolliLink($path: String!) {
    getLolliLink(path: $path) {
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

export default function Showlolli({ location }) {
  const path = location.pathname.replace("/showlolli/", "")

  const { loading, error, data } = useQuery(GET_VOLLY_BY_ID, {
    variables: { path },
  })

  if (loading) {
    return <h2>loading</h2>
  }
  if (error) {
    return <h2>{error}</h2>
  }
  if (data) {
    console.log(data, "get data from graphql")
  }

  return (
    <div>
      {!loading &&
        data.getLolliLink.map((value, key) => (
          <VirtualTemplate
            key={key}
            linkContent={value}
            link={`/${value.link}`}
          />
        ))}
    </div>
  )
}
