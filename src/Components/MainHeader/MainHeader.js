import React from 'react';
import PropTypes from 'prop-types';
import './MainHeader.css'

export default function MainHeader(props) {
  return (
    <header className={`MainHeader ${props.heightClass}`} id="MainHeader">
      {props.children}
    </header>
  )
}

MainHeader.propTypes = {
  heightClass: PropTypes.oneOf([
    'dbl-height',
    'no-height'
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
