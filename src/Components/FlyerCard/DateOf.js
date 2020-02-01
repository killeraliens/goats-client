import React from 'react';
import PropTypes from 'prop-types';

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


//let exampleDate = new Date("04/11/2020") or "2020-04-11T07:00:00.000Z"
DateOf.defaultProps = {
}

DateOf.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ])
}

