import React from 'react';
import PropTypes from 'prop-types';
import './MainNav.css'


export default function MainNav(props) {
  return(
    <div className="MainNav">
      <ul className="MainNav--links">
        {props.links.map((link, i) => <li key={i}>{link}</li>)}
      </ul>
    </div>
  )
}

MainNav.defaultProps = {
  links: []
}

MainNav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object)
}
