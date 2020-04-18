import React from 'react';
import PropTypes from 'prop-types';
import './MainHeaderNav.css'


export default function MainHeaderNav(props) {
  return (
    <div className={`MainHeaderNav ${props.className ? props.className : ''}`}>
      <div className="MainHeaderNav--links">
        {props.links.map((link, i) => <React.Fragment key={i}>{link}</React.Fragment>)}
      </div>
    </div>
  )
}

MainHeaderNav.defaultProps = {
  links: []
}

MainHeaderNav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.element)
}
