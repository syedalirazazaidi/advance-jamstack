import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"

import { graphql } from "gatsby"
import NewLolli from "../components/newLolli"

import { Router } from "@reach/router"

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
  console.log(location, "l09900909")
  const path = location.pathname.replace("/showlolli/", "")
  // const path = state ? state.id : ""
  console.log(path, "LONM====")
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
      {data.getLolliLink[0].recField}
      {data.getLolliLink[0].senderField}
      {data.getLolliLink[0].messageField}
      {/* <Router basepath="/showlolli">hi dear</Router> */}
    </div>
  )

  // return data.getVCard.map((data, key) => {
  //   console.log(data, "HIHI")
  //   const top = data.c1
  //   const middle = data.c2
  //   const bottom = data.c3
  //   return (
  //     <div key={key}>
  //       <NewLolli vollidata={data} path={`/${data.link}`} />
  //       <h1 style={{ fontFamily: "sans-serif" }}>virtual lollipop</h1>
  //       <p>because we all know someone who deserves some sugar.</p>
  //       <div className="containerLolly">
  //         <div style={{ margin: "55px" }}>
  //           <Lolli top={top} middle={middle} bottom={bottom} />
  //         </div>
  //         <div className="Lolly">
  //           <p>Your lolly is freezing. Share it with this link</p>
  //           <h2 className="preLink">
  //             https://virtuallolly.netlify.app/LNKZRm8j-
  //           </h2>
  //           <p className="recip">{data.senderField}</p>
  //           <p className="mess">{data.messageField}</p>
  //           <p className="from">{data.recField}</p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  //)
}
