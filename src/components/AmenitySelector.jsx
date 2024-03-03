import React, { useState } from 'react'

import { FaWind, FaCar, FaPaw, FaWater, FaWifi, FaTv } from "react-icons/fa"


export default function AmenitySelector(props) {

  const [amenities, setAmenities] = useState({
    "airConditioning": false,
    "parkingSpace": false,
    "pets": false,
    "pool": false,
    "wifi": false,
    "tv": false
  })

  function handleChange(event) {
    const updatedAmenities = { ...amenities }
    updatedAmenities[event.target.name] = event.target.checked
    setAmenities(updatedAmenities)
    props.callback(updatedAmenities)
  }

  return (
    <ul>
      <li><input type="checkbox" name="airConditioning" onChange={handleChange} /> <FaWind /> Air Conditioning</li>
      <li><input type="checkbox" name="parkingSpace" onChange={handleChange} /> <FaCar /> Parking Space</li>
      <li><input type="checkbox" name="pets" onChange={handleChange} /> <FaPaw /> Pets</li>
      <li><input type="checkbox" name="pool" onChange={handleChange} /> <FaWater /> Pool</li>
      <li><input type="checkbox" name="wifi" onChange={handleChange} /> <FaWifi /> Wifi</li>
      <li><input type="checkbox" name="tv" onChange={handleChange} /> <FaTv /> TV</li>
    </ul>
  )
}
