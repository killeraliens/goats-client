import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function EventsPreview({ events }) {
  return(
    <ul className="EventInput--preview">
      {events.map(event => {
        return (
          <li >
            <i class="fa fa-minus-circle delete-i"></i>
            <span class="date-i">{event.date}</span>
            <span class="city-i">{event.cityName}</span>
            <span class="venue-i">{event.venueName}</span>
          </li>
        )
      })}
    </ul>
  )
}

EventsPreview.defaultProps = {
  events: []
}

EventsPreview.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    venueName: PropTypes.string,
    countryName: PropTypes.string,
    regionName: PropTypes.string,
    cityName: PropTypes.string
  }))
}
