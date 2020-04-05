import React from 'react'
import './KillerToast.css'
import PropTypes from 'prop-types'

export default function KillerToast({ on, message, className }) {
      return (
        <div className={`KillerToast--container`}>
          <div className={`KillerToast ${on ? 'on' : 'off'} ${className}`}>
            <p>{message}</p>
          </div>
        </div>
      )
}

KillerToast.defaultProps = {
  on: false,
  message: 'Success!',
  className: 'success'
}

KillerToast.propTypes = {
  on: PropTypes.bool,
  message: PropTypes.string,
  className: PropTypes.oneOf([
    'success', 'error', 'dead'
  ])
}
