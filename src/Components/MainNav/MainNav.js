import React from 'react';
import PropTypes from 'prop-types';
import './MainNav.css'


export default function MainNav(props) {
  return(
    <div className={`MainNav ${props.className ? props.className : ''}`}>
      <ul className="MainNav--links">
        {props.links.length > 0
          ? props.links.map((link, i) => <li key={i}>{link}</li>)
          : (
            React.Children.map(props.children, (child, i) => (
              <li key={i}>{React.cloneElement(child, { ...child, key: i })}</li>
            ))
          )
        }
      </ul>
    </div>
  )
}

MainNav.defaultProps = {
  links: []
}

MainNav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node
}
