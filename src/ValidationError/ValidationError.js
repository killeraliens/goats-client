import React from 'react'
import PropTypes from 'prop-types'
import './ValidationError.css'

export default function ValidationError({ message, visible }) {
  return message && visible
    ? <span className="ValidationError error">{message}</span>
    : <span className="ValidationError sr-only">Validations passing. No Error.</span>
}

ValidationError.propTypes = {
  message: PropTypes.string,
  id: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}
