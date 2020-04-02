import React from 'react'
import PropTypes from 'prop-types'
import './ValidationError.css'

export default function ValidationError({ id, message, style }) {

  return message
    ? <span id={id} className={`ValidationError`} style={style}>{message}</span>
    : <span id={id} className={`ValidationError sr-only`} style={style}>No error</span>
}

ValidationError.propTypes = {
  message: PropTypes.string,
  id: PropTypes.string.isRequired,
  style: PropTypes.object
}

ValidationError.defaultProps = {
  message: '',
  style: {}
}

