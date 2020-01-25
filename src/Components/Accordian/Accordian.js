import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Accordian.css';

export default function Accordian({ triggerNode, children }) {
  const [isActive, setIsActive] = useState(false)
  const toggleClassActive = () => {
    isActive ? setIsActive(false) : setIsActive(true)
  }

  return(
    <React.Fragment>
      <div className={`Accordian ${isActive ? "active" : ""}`} onClick={toggleClassActive}>
        {triggerNode}
      </div>
      <div className={`Accordian--content ${isActive ? "active" : ""}`}>
        {children}
      </div>
    </React.Fragment>
  )
}

Accordian.propTypes = {
  triggerNode: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
