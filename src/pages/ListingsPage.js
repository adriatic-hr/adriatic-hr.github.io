import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Accommodation from '../components/Accommodation'
import DatePicker from '../components/DatePicker'
import AmenitySelector from '../components/AmenitySelector'
import GuestsNumber from '../components/GuestsNumber'

// TODO: Replace with data from adriatic api
import accommodations from "../accommodations.json"

const client = axios.create({
  baseURL: "https://api.adriatic.hr"
})

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true

export default function BookingPage() {

  const [guestNumber, setGuestNumber] = useState(0)
  const [reqAmenities, setReqAmenities] = useState({})
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })

  function handleGuestCallback(childGuestNumber) {
    setGuestNumber(childGuestNumber)
  }

  function handleAmenitiesCallback(childAmenities) {
    setReqAmenities(childAmenities)
  }

  function handleDateRangeCallback(childDateRange) {
    console.log("DATERANGE FROM PARENT:", childDateRange)
    setDateRange(childDateRange)
  }

  // useEffect(() => {

  // client.get("/test/accommodation")
  //   .then(function (res) {
  //     console.log(res.data)
  //     accommodations = res.data
  //   })
  //   .catch(function (error) {
  //     console.log("ERROR")
  //   })

  // }, [])

  const filters = {
    dateRange: dateRange,
    amenities: reqAmenities,
    persons: guestNumber,
  }

  return (
    <>
      <h1>Listings</h1>

      <AmenitySelector callback={handleAmenitiesCallback} />
      <GuestsNumber callback={handleGuestCallback} />
      <DatePicker callback={handleDateRangeCallback} />

      {
        accommodations.map((accommodation, index) =>
          <div key={index}>
            <Accommodation {...accommodation} filters={filters} />
          </div>
        )
      }
    </>
  )
}
