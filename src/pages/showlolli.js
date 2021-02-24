import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import NewLolli from "../components/newLolli"

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
// "gatsby-source-graphql": "^2.13.0",
export default function Showlolli(props) {
  console.log(props, "PROPSS")
  const { loading, error, data } = useQuery(VOLLY_QUERY)
  if (loading) return <h2>LOADING...</h2>
  if (error) {
    return <h2>Error</h2>
  }
  if (data) console.log(data, "DATA")

  return data.getVCard.map((data, key) => {
    console.log(data, "HIHI")
    const top = data.c1
    const middle = data.c2
    const bottom = data.c3
    return (
      <div key={key}>
        <NewLolli vollidata={data} path={`/${data.link}`} />
        {/* <h1 style={{ fontFamily: "sans-serif" }}>virtual lollipop</h1>
        <p>because we all know someone who deserves some sugar.</p>
        <div className="containerLolly">
          <div style={{ margin: "55px" }}>
            <Lolli top={top} middle={middle} bottom={bottom} />
          </div>
          <div className="Lolly">
            <p>Your lolly is freezing. Share it with this link</p>
            <h2 className="preLink">
              https://virtuallolly.netlify.app/LNKZRm8j-
            </h2>
            <p className="recip">{data.senderField}</p>
            <p className="mess">{data.messageField}</p>
            <p className="from">{data.recField}</p>
          </div>
        </div> */}
      </div>
    )
  })
}
