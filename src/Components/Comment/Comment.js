import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './Comment.css';
import FlyerCard from '../FlyerCard/FlyerCard';

export default function Comment({ user, isCreator, comment, modified }) {
  const dateToMMDDTimeString = (date) => {
    return ((date.getMonth() > 8)
      ? (date.getMonth() + 1)
      : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9)
      ? date.getDate()
      : ('0' + date.getDate())) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
  }
  // const modifiedAt = new Date(modified).toLocaleString()
  const modifiedAt = dateToMMDDTimeString(new Date(modified))
  return (
    <div className="Comment">
        <div className="Comment--header">
          <div className="flex-center-between">
            <Link to={`/dashboard/${user.id}/contributions`}>
              <Avatar
                imageUrl={user.image_url}
                username={user.username}
              />
            </Link>
            <h3 className="Comment--handle username">
              {user.username}
            </h3>
          </div>
          <span className="Comment--modified-at">
          {isCreator ? <span className="Comment--isCreator">[creator] </span> : null}
          mentioned:<br />{modifiedAt}

          </span>
        </div>
        {comment ? <p className="Comment--comment">{comment}</p> : null}
    </div>

  )
}

Comment.defaultProps = {
  isCreator: false,
  comment: ''
}

Comment.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  isCreator: PropTypes.bool,
  comment: PropTypes.string,
  modified: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired
}
