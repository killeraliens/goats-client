import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/default-avatar.jpg'
import './Avatar.css'

export default function Avatar({ className, imageUrl, username, children }) {
  const avatarImg = imageUrl.length === 0 ? defaultAvatar : imageUrl
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
  className: "Avatar-small"
}

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
