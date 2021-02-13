import React, { useState, useRef } from "react"
import Lolli from "../components/lolli"
import "./style.css"

export default function Home() {
  const [c1, setC1] = useState("#deaa43")
  const [c2, setC2] = useState("#e95946")
  const [c3, setC3] = useState("#d52358")
  const senderField = useRef()
  const recField = useRef()
  const messageField = useRef()
  const handleSubmit = () => {
    console.log(senderField.current.value, "SENDER")
    console.log(recField.current.value, "REVEIVER")
    console.log(messageField.current.value, "MESSAGE")
  }
  return (
    <>
      <h1 className="header">virtual lollipop</h1>
      <p>because we all know someone who deserves some sugar.</p>
      <div className="main-container">
        <div>
          <Lolli top={c1} middle={c2} bottom={c3} />
          <br />

          <input
            type="color"
            value={c1}
            onChange={e => {
              setC1(e.target.value)
            }}
          />
          <input
            type="color"
            value={c2}
            onChange={e => {
              setC2(e.target.value)
            }}
          />
          <input
            type="color"
            value={c3}
            onChange={e => {
              setC3(e.target.value)
            }}
          />
        </div>
        <div className="form-container">
          <input type="text" placeholder="To" ref={senderField} />
          <textarea placeholder="Enter Your Message!" ref={messageField} />
          <input type="text" placeholder="From" ref={recField} />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </>
  )
}
