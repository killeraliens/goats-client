import React from 'react'
import './KillerToast.css'
import PropTypes from 'prop-types'

export default function KillerToast({ on, message, colorClass }) {
      return (
        <div className={`KillerToast--container`}>
          <div className={`KillerToast ${on ? 'on' : 'off'} ${colorClass}`}>
            <p>{message}</p>
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
    'success', 'error', 'dead'
  ])
}
