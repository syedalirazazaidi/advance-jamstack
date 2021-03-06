import React, { useState, useRef } from "react"
import Lolli from "../components/lolli"
import "./style.css"

import { navigate } from "gatsby"

import { useMutation } from "@apollo/client"
import gql from "graphql-tag"

const AddVCARDMutation = gql`
  mutation addVCard(
    $c1: String!
    $c2: String!
    $c3: String!
    $recField: String!
    $senderField: String!
    $messageField: String!
  ) {
    addVCard(
      c1: $c1
      c2: $c2
      c3: $c3
      recField: $recField
      senderField: $senderField
      messageField: $messageField
    ) {
      link
    }
  }
`

export default function Home() {
  const [c1, setC1] = useState("#deaa43")
  const [c2, setC2] = useState("#e95946")
  const [c3, setC3] = useState("#d52358")

  const [addVCard] = useMutation(AddVCARDMutation)

  const senderField = useRef()
  const recField = useRef()
  const messageField = useRef()
  const handleSubmit = async () => {
    if (
      !recField.current.value == "" &&
      !senderField.current.value == "" &&
      !messageField.current.value == ""
    ) {
      await addVCard({
        variables: {
          c1,
          c2,
          c3,
          recField: recField.current.value,
          senderField: senderField.current.value,
          messageField: messageField.current.value,
        },
      }).then(result => {
        navigate(`/showlolli/${result.data?.addVCard?.link}`)

        console.log(result, "YOYO")
      })

      recField.current.value = ""
      senderField.current.value = ""
      messageField.current.value = ""
    }
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
