import { isBefore, isAfter } from 'date-fns'
import React, { useState } from 'react'

import Info from './Info'
import Capacity from './Capacity'

export default function Accommodation(props) {

  const [infoState, setInfoState] = useState(false)

  function checkAvailability(range, availableDates) {
    if (range.startDate && range.endDate)
      return !isBefore(range.startDate, new Date(availableDates.intervalStart).setHours(0)) &&
        !isAfter(range.endDate, new Date(availableDates.intervalEnd).setHours(0))
    else {
      return true
    }
  }
  
  function checkAmenities(selectedAmenities, includedAmenities) {    
    const selected = Object.keys(selectedAmenities).filter(key => selectedAmenities[key])
    return selected.every(element => Object.keys(includedAmenities).filter(key => includedAmenities[key]).includes(element))
  }

  function checkCapacity(persons, maxCapacity) {
    if (persons)
      return persons <= maxCapacity
    else {
      return true
    }
  }

  function renderListing() {
    return (
      <>
        <h4>{props.title}</h4>
        <img src={props.image} alt="" />
        <ul>
          <li>Capacity: <Capacity {...props} /></li>
          {props.beachDistanceInMeters && <li>Distance to beach: {props.beachDistanceInMeters} m</li>}
          <button onClick={() => setInfoState(!infoState)}>More info</button>
          {infoState && <Info {...props} />}
        </ul>
      </>
    )
  }
  
  const isRangeAvailable = (props.availableDates.map((interval) => checkAvailability(props.filters.dateRange, interval))).includes(true)
  const isIncludedAmenitiy = checkAmenities(props.filters.amenities, props.amenities)
  const isCapacity = checkCapacity(props.filters.persons, props.capacity)

  return (
    (isRangeAvailable && isIncludedAmenitiy && isCapacity) && renderListing()
  )
}
