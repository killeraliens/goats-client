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
       <Comment user={flyerCreator} isCreator={true} comment={publishComment} modified={flyer.modified} />
       {/* eventually map all flyer comments here */}
    </div>
  )
}

Comments.defaultProps = {
}

Comments.propTypes = {
  //add other commenters as prop eventually
  flyer: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    publish_comment: PropTypes.string.isRequired,
    modified: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired
  }).isRequired,
  flyerCreator: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    image_url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
}

