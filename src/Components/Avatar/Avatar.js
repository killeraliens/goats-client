import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/default-avatar.jpg'
import './Avatar.css'

export default function Avatar({ className, imageUrl, username, children }) {
  const avatarImg = !Boolean(imageUrl) ? defaultAvatar : imageUrl
  return(
    <div
      className={`Avatar ${className}`}
      style={{ backgroundImage: 'url(' + avatarImg + ')' }}
      alt={`${username} avatar`}
    >
      {children}
    </div>
  )
}

Avatar.defaultProps = {
  className: "Avatar-small",
  imageUrl: ""
}

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  className: PropTypes.string,
  // MENTOR QUESTION: this prop key is required, but I need it to accept empty strings so I can apply default
  // proptypes is failing when passed an empty string - but I need to know if the prop is present
  // https://github.com/facebook/react/issues/9125
  // imageUrl: function (props, propName, componentName) {
  //   const propValue = props[propName] // the actual value of `imageUrl` prop
  //   if (propValue == undefined ) return
  //   if (typeof propValue === 'string') return
  //   return new Error(`${propName} is required. ${componentName} only accepts empty string or string`)
  // },
  imageUrl: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

