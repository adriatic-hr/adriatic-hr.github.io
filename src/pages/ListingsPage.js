import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Accommodation from '../components/Accommodation'
import AmenitySelector from '../components/AmenitySelector'
import DatePicker from '../components/DatePicker'
import GuestsNumber from '../components/GuestsNumber'


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
  const [accommodations, setAccommodations] = useState([])

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

  useEffect(() => {
    client.get("/test/accommodation")
      .then(function (res) {
        setAccommodations(res.data)
      })
      .catch(function (error) {
        console.log("Error fetching data")
      })
  }, [])

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
