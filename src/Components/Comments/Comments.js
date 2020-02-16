import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import './Comments.css';

export default function Comments({ flyer, flyerCreator }) {
  const publishComment = Boolean(flyer.publish_comment)
    ? flyer.publish_comment
    : ""
  return(
    <div className="Comments">
       <Comment userId={flyerCreator.id} username={flyerCreator.username} imageUrl={flyerCreator.image_url} isCreator={true} comment={publishComment} modified={flyer.modified} />
       {/* eventually map all flyer comments here */}
    </div>
  )
}

Comments.defaultProps = {
  flyer: { publish_comment: '' },
  flyerCreator: { image_url: ''}
}

Comments.propTypes = {
  //add other commenters as prop eventually
  flyer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    publish_comment: PropTypes.string,
    modified: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired
  }).isRequired,
  flyerCreator: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired
}

