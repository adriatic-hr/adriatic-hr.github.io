import React from 'react'
import { FaWind, FaCar, FaPaw, FaWater, FaWifi, FaTv } from "react-icons/fa"


export default function AmenityList(props) {
  return (
    <div>
      Amenities:
      {[
        props.airConditioning ? <FaWind /> : null,
        props.parkingSpace ? <FaCar /> : null,
        props.pets ? <FaPaw /> : null,
        props.pool ? <FaWater /> : null,
        props.wifi ? <FaWifi /> : null,
        props.tv ? <FaTv /> : null
      ]}
    </div>
  )
}
