import React, { useEffect, useRef, useState } from 'react'

import { addDays } from 'date-fns'
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'


function DatePicker(props) {

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])


  function handleChange(event) {
    setRange([event.selection])
    props.callback(event.selection)
  }

  const [open, setOpen] = useState(false)

  const refOne = useRef(null)

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  return (
    <div className="calendarWrap">

      <input
        value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(range[0].endDate, "dd/MM/yyyy")}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen(open => !open)}
      />

      <div ref={refOne}>
        {open &&
          <DateRange
            onChange={handleChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
            // disabledDates={[]}
          />
        }
      </div>

    </div>
  )
}

export default DatePicker
