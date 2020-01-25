import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar/Avatar';
import './Comment.css';
import FlyerCard from '../FlyerCard/FlyerCard';

export default function Comment({ user, isCreator, comment, modified }) {
  const modifiedAt = new Date(modified).toLocaleString()
  return (
    <div className="Comment">
        <div className="Comment--header">
          <div className="flex-center-between">
            <Avatar
              imageUrl={user.image_url}
              username={user.username}
            />
            <h3 className="Comment--handle username">
              {user.username}
              {isCreator ? <span className="Comment--isCreator">[creator]</span> : null}
            </h3>
          </div>
          <span className="Comment--modified-at">
             {/* Jan 10, 2020 - 22:33 MST */}
          mentioned: {modifiedAt}
            </span>
        </div>
        {comment ? <p className="Comment--comment">{comment}</p> : null}
    </div>

  )
}

Comment.defaultProps = {
  isCreator: false
}

Comment.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageUrl: PropTypes.string
  }),
  isCreator: PropTypes.bool
}
