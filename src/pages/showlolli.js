import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import Lolli from "../components/lolli"

const VOLLY_QUERY = gql`
  {
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
`

export default function Showlolli() {
  const { loading, error, data } = useQuery(VOLLY_QUERY)
  if (loading) return <h2>LOADING</h2>
  if (error) {
    return <h2>Error</h2>
  }
  if (data) console.log(data, "DATA")

  return data.getVCard.map((data, key) => {
    console.log(data, "FOFOOF")
    const top = data.c1
    const middle = data.c2
    const bottom = data.c3
    console.log(data, "TOPOP")
    return (
      <div key={key}>
        <Lolli top={top} middle={middle} bottom={bottom} />

        {/* <Lolly key={key} pageContext={value} /> */}
      </div>
    )
  })
}
