import React, { useState, useEffect } from 'react'
import './KillerToast.css'
import PropTypes from 'prop-types'

export default function KillerToast({ on, message, colorClass }) {
  const classOn = on ? 'on' : ''

      return (
        <div className={`KillerToast--container`}>
          <div className={`KillerToast ${colorClass} ${classOn}`}>
            {message}
          </div>
        </div>
      )
}

KillerToast.defaultProps = {
  on: false,
  message: 'Success!',
  colorClass: 'success'
}

KillerToast.propTypes = {
  on: PropTypes.bool,
  message: PropTypes.string,
  colorClass: PropTypes.oneOf([
    'success', 'error', 'dead', ''
  ])
}
