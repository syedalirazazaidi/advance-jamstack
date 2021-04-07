import React from "react"
import Lolli from "../components/lolli"

const VirtualTemplate = ({ linkContent, link }) => {
  // console.log("Page Context", JSON.stringify(linkContent))
  console.log(linkContent, "get content")
  return (
    <div className="container">
      <title style={{ color: "green" }}>Get lolli</title>

      <h1 style={{ fontFamily: "sans-serif" }}>virtual lollipop</h1>
      <p>because we all know someone who deserves some sugar.</p>
      <div className="containerLolly">
        <Lolli
          top={linkContent.c1}
          middle={linkContent.c2}
          bottom={linkContent.c3}
        />
        <p className="recip">{linkContent.senderField}</p>
        <p className="mess">{linkContent.messageField}</p>
        <p className="from">{linkContent.recField}</p>
        {/* <div style={{ margin: "55px" }}>
          <Lolli
            top={linkContent.c1}
            middle={linkContent.c2}
            bottom={linkContent.c3}
          />
        </div>
        <div className="Lolly">
          <p>Your lolly is freezing. Share it with this link</p>
          <h2 className="preLink">
            {`https://virtuallolly.netlify.app${link}`}
          </h2>
          <p className="recip">{linkContent.senderField}</p>
          <p className="mess">{linkContent.messageField}</p>
          <p className="from">{linkContent.recField}</p>
        </div> */}
      </div>
    </div>
  )
}

export default VirtualTemplate
