import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/default-avatar.jpg'
import './Avatar.css'

export default function Avatar(props) {
  return(
    <img
      className={`Avatar ${props.className}`}
      src={props.imageUrl}
      alt={`${props.username} avatar`}
    />
  )
}

Avatar.defaultProps = {
  className: "",
  imageUrl: defaultAvatar
}

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageUrl: PropTypes.string
}
