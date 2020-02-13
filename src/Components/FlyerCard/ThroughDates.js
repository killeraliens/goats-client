import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function ThroughDates({ flyerEvents }) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  let eventDates = flyerEvents.map(event => event.event_date)
  eventDates = eventDates.filter(Boolean)

  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const returnFirstDate = (eventDates) => {
    let e = eventDates.sort((a, b) => {
      return new Date(a) < new Date(b) ? -1 : new Date(a) > new Date(b) ? 1 : 0;
    })[0]
    e = new Date(e)
    e = new Date(e.getTime() + Math.abs(e.getTimezoneOffset() * 60000))
    return monthNames[e.getMonth()] + '/' + ("0" + (e.getDate())).slice(-2)
    // let options = { month: 'numeric', day: 'numeric'};
    // return e.toLocaleDateString(options)
  }
  const returnLastDate = (eventDates) => {
    let e = eventDates.sort((a, b) => {
      return new Date(a) > new Date(b) ? a : b
    }).slice(-1).pop()
    e = new Date(e)
    e = new Date(e.getTime() + Math.abs(e.getTimezoneOffset() * 60000))
    return monthNames[e.getMonth()] + '/' + ("0" + (e.getDate())).slice(-2)
  }

  switch (true) {
    case eventDates.length === 1:
      return (
        <p className="Flyer--dates">
          <FontAwesomeIcon icon={faCalendar} />
          {returnFirstDate(eventDates)}
        </p>
      )
    case eventDates.length > 2:
      return (
        <p className="Flyer--dates">
          <FontAwesomeIcon icon={faCalendar} />
          {returnFirstDate(eventDates)} - {returnLastDate(eventDates)}
        </p>
      )
    default:
      return null
  }
}

ThroughDates.defaultProps = {
  flyerEvents: []
}

ThroughDates.propTypes = {
  flyerEvents: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ])
  }))
}

