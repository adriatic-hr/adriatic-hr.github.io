import React, { useState } from 'react'

export default function GuestsNumber(props) {

  const [guestsNumber, setGuestsNumber] = useState(0)

  function handleChange(event) {
    setGuestsNumber(event.target.value)
    props.callback(event.target.value)
  }


  return (
    <div>
      Guests:
      <input
        type="number"
        name="guestsNumber"
        id="guests"
        min="1"
        max="10"
        step="1"
        onChange={handleChange}
      />
    </div>
  )
}
