import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { returnFirstDate, returnLastDate } from '../../helpers/dateHelpers'

export default function ThroughDates({ flyerEvents }) {
  let eventDates = flyerEvents.map(event => event.event_date)
  eventDates = eventDates.filter(Boolean)

  switch (true) {
    case eventDates.length === 1:
      return (
        <p className="Flyer--dates">
          <FontAwesomeIcon icon={faCalendar} />
          {returnFirstDate(eventDates)}
        </p>
      )
    case eventDates.length > 1:
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
    id: PropTypes.string,
    flyer_id: PropTypes.string,
    event_date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    venue_name: PropTypes.string,
    country_name: PropTypes.string,
    region_name: PropTypes.string,
    city_name: PropTypes.string,
    city_id: PropTypes.number,
    cancelled: PropTypes.bool
  }))
}

