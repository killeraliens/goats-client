import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/default-avatar.jpg'
import './Avatar.css'
import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons';

export default function Avatar(props) {
  return(
    // <img
    //   className={`Avatar ${props.className}`}
    //   src={props.imageUrl}
    //   alt={`${props.username} avatar`}
    // />
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
  imageUrl: PropTypes.string
}
