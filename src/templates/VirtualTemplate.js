import React from "react"
import Lolli from "../components/lolli"

import { navigate } from "gatsby"
import { useQuery, gql } from "@apollo/client"
// export const GET_VOLLY_BY_ID = gql`
//   query getLolliLink($path: String!) {
//     getLolliLink(path: $path) {
//       c1
//       c2
//       c3
//       recField
//       senderField
//       messageField
//       link
//     }
//   }
// `

const VirtualTemplate = ({ pageContext }) => {
  console.log(pageContext.link, "=====PLsdasd-0-0PLPL")
  const path = pageContext.link
  // const { loading, error, data } = useQuery(GET_VOLLY_BY_ID, {
  //   variables: { path },
  // })

  // if (loading) {
  //   return <h2>loading</h2>
  // }
  return (
    <div className="container">
      <title style={{ color: "green" }}>Get lolli</title>
      {/* <Lolli
        top={pageContext.c1}
        middle={pageContext.c2}
        bottom={pageContext.c3}
      /> */}
      <h1 style={{ fontFamily: "sans-serif" }}>virtual lollipop</h1>
      <p>because we all know someone who deserves some sugar.</p>
      <div className="containerLolly">
        <div style={{ margin: "55px" }}>
          <Lolli
            top={pageContext.c1}
            middle={pageContext.c2}
            bottom={pageContext.c3}
          />
        </div>
        <div className="Lolly">
          <p>Your lolly is freezing. Share it with this link</p>
          <h2 className="preLink">
            https://virtuallolly.netlify.app/LNKZRm8j-
          </h2>
          <p className="recip">{pageContext.senderField}</p>
          <p className="mess">{pageContext.messageField}</p>
          <p className="from">{pageContext.recField}</p>
        </div>
      </div>
    </div>
  )
}

export default VirtualTemplate
