import React from 'react'
import { FaMale } from "react-icons/fa"

export default function Capacity(props) {
  return (
    <>
      {props.capacity < 6 ? [...Array(props.capacity)].map((e, i) => <FaMale />) : <><FaMale /> x {props.capacity}</>}
    </>
  )
}
