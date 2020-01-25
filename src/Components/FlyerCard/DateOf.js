import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function DateOf({ date }) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];


  let e = new Date(date)
  e = new Date(e.getTime() + Math.abs(e.getTimezoneOffset() * 60000))

  return (
    <span className="DateOf">{monthNames[e.getMonth()] + '/' + ("0" + (e.getDate())).slice(-2)}</span>
  )

}


DateOf.propTypes = {
  date: PropTypes.string.isRequired
}

