import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './MainNavLink.css';

export default function MainNavLink(props) {

  return(
    <NavLink
      onClick={(e) => {
        if(props.callback) {
          e.preventDefault()
          props.callback()
        }
        if(props.callbackRedirect) {
          props.callbackRedirect()
        }
      }}
      className={`MainNavLink ${props.activeColorClass} ${props.className ? props.className : ''}`}
      to={props.to}
      isActive={props.isActive}
    >
      {props.children}
    </NavLink>
  )
}

MainNavLink.defaultProps = {
  activeColorClass: 'whitesmoke-black',
  callback: null,
  isActive: null
}

MainNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  activeColorClass: PropTypes.oneOf([
    'whitesmoke-black',
    'green-white',
    'blue-white',
    'red-white'
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  callback: PropTypes.func,
  isActive: PropTypes.func
}
