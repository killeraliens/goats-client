import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './Comment.css';
import { dateToMMDDTimeString } from '../../helpers/dateHelpers'
import { createMarkup } from '../../helpers/textHelpers'

export default function Comment({ userId, username, imageUrl, isCreator, comment, modified }) {

  const modifiedAt = dateToMMDDTimeString(new Date(modified))
  return (
    <div className="Comment">
        <div className="Comment--header">
          <div className="flex-center-between">
            <Link to={`/dashboard/${userId}/contributions`}>
              <Avatar
                imageUrl={imageUrl}
                username={username}
              />
            </Link>
            <h3 className="Comment--handle username">
              {username}
            </h3>
          </div>
          <span className="Comment--modified-at">
          {/* {isCreator ? <span className="Comment--isCreator">[creator] </span> : null}
          mentioned:<br />{modifiedAt} */}

          {isCreator
            ? <span>published <br />{modifiedAt}</span>
            : <span>mentioned <br />{modifiedAt}}</span>}

          </span>
        </div>
      {comment
        ? <p className="Comment--comment" dangerouslySetInnerHTML={createMarkup(comment)}></p>
        : null}
    </div>

  )
}

Comment.defaultProps = {
  imageUrl: '',
  isCreator: false,
  comment: '',
}

Comment.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  isCreator: PropTypes.bool,
  comment: PropTypes.string,
  modified: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired
}
