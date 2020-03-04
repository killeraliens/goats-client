import React from 'react';
import PropTypes from 'prop-types';
import './CentralContainer.css'

export default function CentralContainer({ className, children }) {
  return(
    <div className={`CentralContainer ${className ? className : ''}`}>
      {children}
    </div>
  )
}

CentralContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
