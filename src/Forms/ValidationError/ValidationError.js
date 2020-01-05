import React from 'react'
import PropTypes from 'prop-types'
import './ValidationError.css'

export default function ValidationError({ id, message }) {

  return message
    ? <span id={id} className={`ValidationError`}>{message}</span>
    : <span id={id} className={`ValidationError sr-only`}>No error</span>
}

ValidationError.propTypes = {
  message: PropTypes.string,
  id: PropTypes.string.isRequired
}

ValidationError.defaultProps = {
  message: ''
}

