import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/default-avatar.jpg'
import './Avatar.css'

export default function Avatar(props) {
  return(
    <div
      className={`Avatar ${props.className}`}
      style={{ backgroundImage: 'url(' + props.imageUrl + ')' }}
      alt={`${props.username} avatar`}
    >
      {props.children}
    </div>
  )
}

Avatar.defaultProps = {
  className: "",
  imageUrl: defaultAvatar
}

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
