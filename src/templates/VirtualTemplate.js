import React from "react"
import Lolli from "../components/lolli"

import { navigate } from "gatsby"

const VirtualTemplate = ({ pageContext }) => {
  console.log(pageContext.c1, "PLsdasd-0-0PLPL")
  // console.log("Page Context", JSON.stringify(context))

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
