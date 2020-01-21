import React from 'react';
import PropTypes from 'prop-types';
import './CentralContainer.css'

export default function CentralContainer(props) {
  return(
    <div className="CentralContainer">
      {props.children}
    </div>
  )
}

CentralContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
