import React, { useState } from 'react'
import { isBefore, isAfter } from 'date-fns'
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap'

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
      <Card style={{flex: 1}}>
        <Row >
          <Col>
            <Card.Img src={props.image} />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item>Capacity: <Capacity {...props} /></ListGroup.Item>
                  {props.beachDistanceInMeters && <ListGroup.Item>Distance to beach: {props.beachDistanceInMeters} m</ListGroup.Item>}
                  <Button variant="primary" onClick={() => setInfoState(!infoState)}>More info</Button>
                  {infoState && <Info {...props} />}
                </ListGroup >
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    )
  }

  const isRangeAvailable = (props.availableDates.map((interval) => checkAvailability(props.filters.dateRange, interval))).includes(true)
  const isIncludedAmenitiy = checkAmenities(props.filters.amenities, props.amenities)
  const isCapacity = checkCapacity(props.filters.persons, props.capacity)

  return (
    (isRangeAvailable && isIncludedAmenitiy && isCapacity) && renderListing()
  )
}
