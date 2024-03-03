import React from 'react'
import AmenityList from './AmenityList'
import Price from './Price'

export default function Info(props) {
  return (
    <ul>
      <li><AmenityList {...props.amenities} /></li>
      <li><Price {...props} /></li>
    </ul>
  )
}
